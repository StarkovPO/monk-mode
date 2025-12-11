# Quickstart Guide: Achievement System

**Feature**: User Achievements System  
**Audience**: Developers implementing or extending achievements  
**Last Updated**: 2025-12-09

## Overview

The achievement system rewards users with emoji-based stickers for meditation milestones. All data is stored locally via AsyncStorage, fully offline-capable.

**Key Concepts**:
- **AchievementDefinition**: Static list of possible achievements (in code)
- **Achievement**: User's progress/unlock status (in storage)
- **AchievementEvent**: User actions that trigger unlock checks

---

## Quick Start

### 1. View Existing Achievements

Navigate to the activity page in the app to see the achievement grid.

```typescript
// In activity.tsx
import { AchievementGrid } from './components/AchievementGrid';

<AchievementGrid />  // Renders all achievements
```

### 2. Add a New Achievement

**Step 1**: Add definition to `services/achievements.ts`

```typescript
export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  // ... existing achievements
  {
    id: 'meditation_master',      // Unique ID
    name: 'Meditation Master',    // Display name
    emoji: '🎖️',                   // Icon
    description: 'Complete 365 consecutive days',
    unlockType: 'streak_days',
    unlockValue: 365
  }
];
```

**Step 2**: Done! Achievement will auto-appear in the grid.

New achievements start as locked for all users. Existing users will see it on next app launch.

### 3. Trigger Achievement Checks

After user actions that may unlock achievements:

```typescript
import { checkAndUnlockAchievements } from './services/achievements';

// After completing a session
const newUnlocks = await checkAndUnlockAchievements({
  type: 'session_complete',
  metadata: {
    totalSessions: streaks.totalDays,
    currentStreak: streaks.currentStreak
  }
});

if (newUnlocks.length > 0) {
  console.log('New achievements unlocked:', newUnlocks);
  // Show celebration (P3)
}
```

### 4. Test with Debug Panel

The app includes a debug panel for testing:

```
1. Open activity page
2. Tap "🛠️ Debug" button
3. Set test data (e.g., "Week Streak" = 7 days)
4. Achievements automatically update
```

Or programmatically:

```typescript
import { resetAchievements } from './services/achievements';

// Clear all achievements (testing only)
await resetAchievements();

// Manually unlock for testing
const data = await getAchievementsData();
data.achievements.find(a => a.id === 'first_step').unlocked = true;
await saveAchievementsData(data);
```

---

## Architecture Overview

### File Structure

```
app/
├── services/
│   ├── achievements.ts       # Core logic (unlock checks, storage)
│   └── storage.ts            # Storage keys and helpers
├── components/
│   ├── AchievementGrid.tsx   # Grid container
│   ├── AchievementItem.tsx   # Single achievement display
│   ├── AchievementDetail.tsx # Detail modal (P2)
│   └── AchievementCelebration.tsx  # Unlock animation (P3)
├── types/
│   └── achievements.ts       # TypeScript interfaces
└── activity.tsx              # Activity page (includes grid)
```

### Data Flow

```
User Action
   ↓
AchievementEvent created
   ↓
checkAndUnlockAchievements()
   ↓
Load from AsyncStorage
   ↓
Check each locked achievement
   ↓
Unlock if criteria met
   ↓
Save to AsyncStorage
   ↓
Return newly unlocked[]
   ↓
UI updates automatically
```

---

## API Reference

### Core Functions

#### `getAllAchievements()`

Returns all achievements with their unlock status.

```typescript
const achievements = await getAllAchievements();
// Returns: AchievementWithDefinition[]

achievements.forEach(achievement => {
  console.log(achievement.name);         // 'First Step'
  console.log(achievement.emoji);        // '🧘'
  console.log(achievement.unlocked);     // true/false
  console.log(achievement.unlockedAt);   // '2025-12-09T10:15:00Z' or undefined
});
```

#### `checkAndUnlockAchievements(event)`

Checks if any achievements should unlock based on an event.

```typescript
const newUnlocks = await checkAndUnlockAchievements({
  type: 'session_complete',
  metadata: {
    totalSessions: 10,
    currentStreak: 5
  }
});

// Returns: AchievementDefinition[] (newly unlocked)
newUnlocks.forEach(achievement => {
  console.log(`Unlocked: ${achievement.emoji} ${achievement.name}`);
});
```

**Event Types**:
- `session_complete`: After meditation session
- `streak_update`: When streak count changes
- `lesson_complete`: After reading a lesson (P2)

#### `getAchievementProgress(id)`

Gets current progress toward a specific achievement.

```typescript
const progress = await getAchievementProgress('weekly_warrior');
console.log(progress);
// {
//   current: 3,      // User has 3-day streak
//   required: 7,     // Needs 7 days
//   percentage: 42.8 // 3/7 = 42.8%
// }
```

#### `isAchievementUnlocked(id)`

Quick check if an achievement is unlocked.

```typescript
const hasFirstStep = await isAchievementUnlocked('first_step');
if (hasFirstStep) {
  console.log('User has completed their first meditation!');
}
```

#### `resetAchievements()`

Clears all achievement data (testing/debugging only).

```typescript
await resetAchievements();
// All achievements reset to locked state
```

---

## Adding New Achievement Types

### Example: Time-Based Achievement

**Goal**: Unlock after meditating at specific times (e.g., "Early Bird" for meditating before 9am)

**Step 1**: Add new unlock type

```typescript
// In types/achievements.ts
type UnlockType = 
  | 'session_count'
  | 'streak_days'
  | 'lesson_complete'
  | 'time_of_day';  // NEW

interface TimeOfDayMetadata {
  sessionTime: string;  // ISO timestamp
}
```

**Step 2**: Add achievement definition

```typescript
{
  id: 'early_bird',
  name: 'Early Bird',
  emoji: '🌅',
  description: 'Meditate before 9am',
  unlockType: 'time_of_day',
  unlockValue: 9  // Hour (0-23)
}
```

**Step 3**: Add unlock logic

```typescript
// In services/achievements.ts
function checkUnlock(achievement: AchievementDefinition, event: AchievementEvent): boolean {
  // ... existing checks
  
  if (achievement.unlockType === 'time_of_day') {
    const sessionTime = new Date(event.metadata.sessionTime);
    const hour = sessionTime.getHours();
    return hour < achievement.unlockValue;
  }
}
```

**Step 4**: Trigger check

```typescript
// In summary.tsx after session
await checkAndUnlockAchievements({
  type: 'session_complete',
  metadata: {
    sessionTime: new Date().toISOString(),
    // ... other metadata
  }
});
```

---

## Component Usage

### AchievementGrid

Displays all achievements in a grid.

```typescript
import { AchievementGrid } from './components/AchievementGrid';

<AchievementGrid
  onAchievementPress={(achievement) => {
    // Optional: handle tap (P2)
    console.log('Tapped:', achievement.name);
  }}
/>
```

**Props**:
- `onAchievementPress?: (achievement) => void` - Optional tap handler

### AchievementItem

Single achievement display (used by Grid).

```typescript
import { AchievementItem } from './components/AchievementItem';

<AchievementItem
  achievement={achievement}
  size="large"  // or 'small', 'medium'
  onPress={() => showDetail(achievement)}
/>
```

**Props**:
- `achievement: AchievementWithDefinition` - Achievement data
- `size?: 'small' | 'medium' | 'large'` - Display size
- `onPress?: () => void` - Tap handler

### AchievementDetail (P2)

Detail modal showing achievement info.

```typescript
import { AchievementDetail } from './components/AchievementDetail';

const [selected, setSelected] = useState(null);

<AchievementDetail
  achievement={selected}
  visible={selected !== null}
  onClose={() => setSelected(null)}
/>
```

**Props**:
- `achievement: AchievementWithDefinition | null`
- `visible: boolean`
- `onClose: () => void`

**Shows**:
- Achievement name and emoji
- Description
- If locked: Progress (e.g., "3 / 7 days")
- If unlocked: Date earned, celebration message

---

## Testing

### Manual Testing Checklist

```
[ ] View activity page with 0 sessions → all achievements locked
[ ] Complete first session → "First Step" unlocks
[ ] Reach 7-day streak → "Weekly Warrior" unlocks
[ ] Complete 30 sessions → "Committed" unlocks
[ ] Tap locked achievement → see progress (P2)
[ ] Tap unlocked achievement → see earned date (P2)
[ ] Close app, reopen → achievements persist
[ ] Clear app data → achievements reset
```

### Debug Commands

```typescript
// View current state
const all = await getAllAchievements();
console.log('Unlocked:', all.filter(a => a.unlocked).length);

// Force unlock (testing only)
await checkAndUnlockAchievements({
  type: 'session_complete',
  metadata: { totalSessions: 100, currentStreak: 50 }
});

// Reset everything
await resetAchievements();
```

### Unit Test Example

```typescript
import { checkUnlock } from './services/achievements';

test('unlocks First Step after first session', async () => {
  const achievement = {
    id: 'first_step',
    unlockType: 'session_count',
    unlockValue: 1
  };
  
  const event = {
    type: 'session_complete',
    metadata: { totalSessions: 1, currentStreak: 1 }
  };
  
  const shouldUnlock = checkUnlock(achievement, event);
  expect(shouldUnlock).toBe(true);
});
```

---

## Common Tasks

### Change Achievement Icon

```typescript
// In services/achievements.ts
{
  id: 'first_step',
  emoji: '🧘', // ← Change this emoji
  // ...
}
```

### Adjust Unlock Threshold

```typescript
{
  id: 'weekly_warrior',
  unlockValue: 7,  // ← Change to 10 for 10-day streak
  // ...
}
```

### Hide Achievement Temporarily

```typescript
// Don't remove from definitions (breaks existing users)
// Instead, filter in getAllAchievements():

export async function getAllAchievements() {
  const all = mergeWithDefinitions();
  
  // Hide specific achievement
  return all.filter(a => a.id !== 'early_bird');
}
```

### Add Achievement to Debug Panel

```typescript
// In components/DebugPanel.tsx

<Pressable
  style={styles.button}
  onPress={() => setStreakData(365, 365, 365)}
>
  <Text style={styles.buttonText}>🎖️ Year Streak (365 days)</Text>
</Pressable>
```

---

## Troubleshooting

### Achievement not showing

**Problem**: Added new achievement but it doesn't appear

**Solutions**:
1. Check `ACHIEVEMENT_DEFINITIONS` array includes it
2. Restart app (hot reload may not work)
3. Clear app data to reset storage

### Achievement won't unlock

**Problem**: Completed action but achievement stays locked

**Solutions**:
1. Verify `checkAndUnlockAchievements()` is called after action
2. Check unlock criteria matches event metadata
3. Add console.log in unlock logic to debug
4. Use debug panel to manually set data

### Progress shows wrong value

**Problem**: "3/7 days" but user has 5-day streak

**Solutions**:
1. Check you're reading correct data source (streaks vs sessions)
2. Verify `getAchievementProgress()` uses right unlock type
3. Confirm streak data is updating correctly

---

## Performance Tips

1. **Batch Checks**: Call `checkAndUnlockAchievements()` once per session, not per action
2. **Async Loading**: Load achievements asynchronously on activity page
3. **Memoization**: Cache achievement list in component state
4. **Lazy Details**: Only load progress on tap (P2), not for all achievements

```typescript
// Good: Single check after session
const unlocks = await checkAndUnlockAchievements(sessionEvent);

// Bad: Multiple checks
await checkAndUnlockAchievements(event1);
await checkAndUnlockAchievements(event2);
await checkAndUnlockAchievements(event3);
```

---

## Future Enhancements

Ideas for extending the system:

- **Achievement Categories**: Group by type (streak, session, lesson)
- **Rarity Tiers**: Common, Rare, Epic achievements
- **Secret Achievements**: Hidden until unlocked
- **Progress Bars**: Visual progress toward next unlock
- **Sharing**: Share achievements to social media
- **Sound Effects**: Play sound on unlock
- **Animation**: Custom animations per achievement type

---

## References

- **Specification**: [spec.md](./spec.md)
- **Implementation Plan**: [plan.md](./plan.md)
- **Data Model**: [data-model.md](./data-model.md)
- **Research**: [research.md](./research.md)

## Support

For questions or issues:
1. Check this guide first
2. Review spec.md for requirements
3. Check existing code in `services/achievements.ts`
4. Test with debug panel

---

**Version**: 1.0.0  
**Status**: Phase 1 Complete (P1 ready for implementation)
