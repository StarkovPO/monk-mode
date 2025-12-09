# Data Model: Achievement System

**Feature**: User Achievements System  
**Date**: 2025-12-09  
**Purpose**: Define entities, relationships, and storage schema for achievements

## Entity Definitions

### AchievementDefinition (Static, Code-Defined)

Predefined achievement templates that exist in code, not user data.

**Purpose**: Defines what achievements exist and how to unlock them

**Attributes**:
```typescript
interface AchievementDefinition {
  id: string;                    // Unique identifier (e.g., 'first_step')
  name: string;                  // Display name (e.g., 'First Step')
  emoji: string;                 // Unicode emoji icon (e.g., '🧘')
  description: string;           // What this achievement represents
  unlockType: UnlockType;        // How to unlock this achievement
  unlockValue: number | string;  // Threshold/criteria for unlock
}

type UnlockType = 
  | 'session_count'    // Unlock after N total sessions
  | 'streak_days'      // Unlock after N consecutive days
  | 'lesson_complete';  // Unlock after completing specific lessons
```

**Validation Rules**:
- `id` must be unique across all achievements
- `emoji` must be a single Unicode emoji character
- `unlockValue` must be positive number for `session_count` and `streak_days`
- `unlockValue` can be string identifier for `lesson_complete` (e.g., 'all_basics')

**Example**:
```typescript
{
  id: 'weekly_warrior',
  name: 'Weekly Warrior',
  emoji: '🔥',
  description: 'Meditate 7 days in a row',
  unlockType: 'streak_days',
  unlockValue: 7
}
```

**Source of Truth**: `services/achievements.ts` (ACHIEVEMENT_DEFINITIONS array)

---

### Achievement (User Progress, Stored)

User's unlock status for each achievement.

**Purpose**: Track which achievements the user has unlocked and when

**Attributes**:
```typescript
interface Achievement {
  id: string;          // References AchievementDefinition.id
  unlocked: boolean;   // Whether user has unlocked this
  unlockedAt?: string; // ISO 8601 timestamp of unlock (if unlocked)
}
```

**Validation Rules**:
- `id` must match an existing AchievementDefinition
- If `unlocked` is true, `unlockedAt` must be present
- If `unlocked` is false, `unlockedAt` must be absent
- `unlockedAt` cannot be in the future
- Once `unlocked` is true, it cannot revert to false

**State Transitions**:
```
┌─────────┐  unlock event  ┌───────────┐
│ Locked  │ ───────────→  │ Unlocked  │
│         │                │           │
│ unlocked: false         │ unlocked: true
│ unlockedAt: undefined   │ unlockedAt: '2025-12-09T15:30:00Z'
└─────────┘                └───────────┘
                               ↓
                           (permanent)
```

**Example**:
```typescript
// Locked achievement
{
  id: 'mindful_month',
  unlocked: false
}

// Unlocked achievement
{
  id: 'first_step',
  unlocked: true,
  unlockedAt: '2025-12-09T10:15:00.000Z'
}
```

---

### AchievementsData (Storage Container)

Root object stored in AsyncStorage.

**Purpose**: Container for all user achievement data with versioning

**Attributes**:
```typescript
interface AchievementsData {
  achievements: Achievement[];  // Array of user's achievement progress
  version: number;              // Schema version for migrations
}
```

**Validation Rules**:
- `achievements` array must include all defined achievements (no missing entries)
- `version` must be a positive integer (current version: 1)
- No duplicate achievement IDs in array

**Default State** (new user):
```typescript
{
  achievements: [
    { id: 'first_step', unlocked: false },
    { id: 'weekly_warrior', unlocked: false },
    { id: 'mindful_month', unlocked: false },
    { id: 'committed', unlocked: false },
    { id: 'dedicated', unlocked: false },
    { id: 'student', unlocked: false }
  ],
  version: 1
}
```

**Storage Key**: `@monk_mode:achievements`

**Storage Size**: ~1-2KB (6-15 achievements)

---

### AchievementEvent (Transient, Not Stored)

Events that trigger achievement unlock checks.

**Purpose**: Encapsulate user actions that may unlock achievements

**Attributes**:
```typescript
interface AchievementEvent {
  type: 'session_complete' | 'streak_update' | 'lesson_complete';
  metadata: SessionMetadata | StreakMetadata | LessonMetadata;
}

interface SessionMetadata {
  totalSessions: number;    // From Streaks.totalDays
  currentStreak: number;    // From Streaks.currentStreak
}

interface StreakMetadata {
  newStreak: number;        // Updated streak count
}

interface LessonMetadata {
  lessonId: string;         // Which lesson was completed
  categoryId?: string;      // Optional category grouping
}
```

**Lifecycle**: Created → Processed → Discarded (not persisted)

**Example**:
```typescript
// After completing a meditation session
{
  type: 'session_complete',
  metadata: {
    totalSessions: 7,
    currentStreak: 3
  }
}
```

---

## Relationships

### Achievement ← AchievementDefinition (1:1, Weak Reference)

```
AchievementDefinition (code)     Achievement (storage)
┌─────────────────────┐         ┌──────────────────┐
│ id: 'first_step'    │ ←───────│ id: 'first_step' │
│ name: 'First Step'  │         │ unlocked: true   │
│ emoji: '🧘'         │         │ unlockedAt: ...  │
│ ...                 │         └──────────────────┘
└─────────────────────┘
```

- Each Achievement references one AchievementDefinition by ID
- Definitions are static, achievements are dynamic user data
- If definition removed from code, achievement becomes orphaned (handled gracefully)

### AchievementsData → Achievement[] (1:Many, Composition)

```
AchievementsData
┌────────────────────────┐
│ version: 1             │
│ achievements: [        │
│   ├─ Achievement 1     │
│   ├─ Achievement 2     │
│   ├─ Achievement 3     │
│   └─ ...               │
│ ]                      │
└────────────────────────┘
```

- AchievementsData owns the achievements array
- Array includes exactly one entry per defined achievement
- New achievements added via migration (version bump)

---

## Storage Schema

### AsyncStorage Structure

**Key**: `@monk_mode:achievements`

**Value** (JSON string):
```json
{
  "achievements": [
    {
      "id": "first_step",
      "unlocked": true,
      "unlockedAt": "2025-12-09T10:15:00.000Z"
    },
    {
      "id": "weekly_warrior",
      "unlocked": false
    },
    {
      "id": "mindful_month",
      "unlocked": false
    }
  ],
  "version": 1
}
```

**Size**: ~150 bytes per achievement × 6 = ~900 bytes + overhead = ~1KB

---

## Data Flow

### Initialization Flow

```
App Start
   ↓
Load achievements from AsyncStorage
   ↓
Parse JSON → AchievementsData
   ↓
Merge with ACHIEVEMENT_DEFINITIONS
   ↓
   ├─ If achievement in storage but not in definitions → orphaned, ignore
   ├─ If achievement in definitions but not storage → create new entry (unlocked: false)
   └─ If match → use stored state
   ↓
Return merged achievement list
```

### Unlock Flow

```
User Action (e.g., complete session)
   ↓
Create AchievementEvent
   ↓
Call checkAndUnlockAchievements(event)
   ↓
Load current achievements from storage
   ↓
For each unlocked: false achievement
   ├─ Get definition
   ├─ Check if unlock criteria met
   ├─ If yes:
   │   ├─ Set unlocked = true
   │   ├─ Set unlockedAt = now()
   │   └─ Add to newlyUnlocked[]
   └─ If no: skip
   ↓
Save updated achievements to storage
   ↓
Return newlyUnlocked[]
   ↓
Show celebration (if any unlocked)
```

### Display Flow

```
User opens Activity page
   ↓
Call getAllAchievements()
   ↓
Load from AsyncStorage
   ↓
Merge with definitions
   ↓
Map to UI models (with emoji, name, description)
   ↓
Render in AchievementGrid
   ↓
User taps achievement (P2)
   ↓
Load progress data (if locked)
   ├─ session_count: read Streaks.totalDays
   ├─ streak_days: read Streaks.currentStreak
   └─ lesson_complete: read lesson completion status
   ↓
Show AchievementDetail modal
```

---

## Migration Strategy

### Version 1 → Version 2 (Example Future Migration)

When adding new achievements:

```typescript
async function migrateAchievements(data: AchievementsData): Promise<AchievementsData> {
  if (data.version < 2) {
    // Add new achievements introduced in v2
    const newAchievements = [
      { id: 'zen_master', unlocked: false },
      { id: 'early_bird', unlocked: false }
    ];
    
    return {
      achievements: [...data.achievements, ...newAchievements],
      version: 2
    };
  }
  return data;
}
```

### Rollback Handling

If achievement definitions are removed:
- Stored achievements with orphaned IDs are ignored during render
- No data corruption; just skip unknown achievements
- User's unlocked status for removed achievements is preserved (for potential future restore)

---

## Query Patterns

### Get all achievements (for display)
```typescript
const allAchievements = await getAllAchievements();
// Returns Achievement[] with definition data merged
```

### Check if achievement unlocked
```typescript
const isUnlocked = await isAchievementUnlocked('first_step');
// Returns boolean
```

### Get unlocked count
```typescript
const unlockedCount = allAchievements.filter(a => a.unlocked).length;
```

### Get progress toward achievement
```typescript
const progress = await getAchievementProgress('weekly_warrior');
// Returns { current: 3, required: 7, percentage: 42.8 }
```

---

## Constraints & Invariants

**Invariants** (must always be true):
1. Every stored Achievement.id matches an AchievementDefinition.id (or is orphaned and ignored)
2. If Achievement.unlocked === true, then Achievement.unlockedAt !== undefined
3. Achievement.unlockedAt is never in the future
4. Once unlocked, Achievement.unlocked never reverts to false
5. AchievementsData.version >= 1

**Performance Constraints**:
- Read operation: <10ms (AsyncStorage is fast for <10KB)
- Write operation: <50ms (infrequent, only on unlock)
- Unlock check: <2ms (O(n) where n=15 achievements)

**Storage Constraints**:
- Total size: <50KB (current: ~1-2KB, room for growth)
- Max achievements: ~100 (still <10KB)

---

## Testing Scenarios

### Data Integrity Tests

1. **New User**: Storage is empty → initialize with all achievements locked
2. **Partial Unlock**: Some achievements unlocked → load correctly, maintain state
3. **All Unlocked**: All achievements unlocked → display correctly
4. **Corrupted Data**: Invalid JSON → fall back to empty state
5. **Version Mismatch**: Old version number → run migration
6. **Orphaned Achievement**: Achievement ID not in definitions → ignore gracefully

### State Transition Tests

1. **First Unlock**: locked → unlocked with timestamp
2. **Duplicate Unlock**: Try unlocking already-unlocked → no-op
3. **Simultaneous Unlocks**: Multiple achievements unlock at once → all saved correctly
4. **Clear Data**: User clears app data → all achievements reset to locked

---

## Example: Complete Achievement Journey

**Initial State** (new user):
```json
{
  "achievements": [
    {"id": "first_step", "unlocked": false}
  ],
  "version": 1
}
```

**After First Session**:
```json
{
  "achievements": [
    {
      "id": "first_step",
      "unlocked": true,
      "unlockedAt": "2025-12-09T10:15:00.000Z"
    }
  ],
  "version": 1
}
```

**After 7-Day Streak**:
```json
{
  "achievements": [
    {
      "id": "first_step",
      "unlocked": true,
      "unlockedAt": "2025-12-09T10:15:00.000Z"
    },
    {
      "id": "weekly_warrior",
      "unlocked": true,
      "unlockedAt": "2025-12-15T08:30:00.000Z"
    }
  ],
  "version": 1
}
```

---

## References

- Storage service: `apps/mobile/app/services/storage.ts`
- Streaks data model: `specs/1-meditation-timer-streaks/data-model.md`
- TypeScript interfaces: `apps/mobile/app/types/achievements.ts` (to be created)
