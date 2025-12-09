# Data Model: Streak Display Page

## Overview
This feature displays existing streak data tracked by Feature 1 (meditation-timer-streaks). No new data entities are created; this is a read-only display layer.

## Existing Entity: Streaks

**Source**: `/apps/mobile/app/services/storage.ts` (defined in Feature 1)

```typescript
interface Streaks {
  lastCreditedDate: string;    // YYYY-MM-DD format, device local timezone
  currentStreak: number;        // Consecutive days of meditation
  longestStreak: number;        // All-time maximum streak
  totalDays: number;            // Lifetime count of unique meditation days
}
```

### Field Descriptions

| Field | Type | Description | Example | Constraints |
|-------|------|-------------|---------|-------------|
| `lastCreditedDate` | string | Last date user received streak credit (YYYY-MM-DD) | "2025-12-05" | Empty string if no sessions |
| `currentStreak` | number | Current consecutive days of meditation | 7 | ≥ 0; resets to 1 on missed day |
| `longestStreak` | number | Historical maximum consecutive days | 15 | ≥ currentStreak (or equal) |
| `totalDays` | number | Total unique days with meditation sessions | 42 | ≥ 0; never decreases |

### Business Rules (from Feature 1)

1. **Day Credit**: User receives credit when starting a meditation session (not completing)
2. **Timezone**: Uses device local timezone; day boundaries based on device time
3. **Same Day Sessions**: Multiple sessions on same day count as 1 day
4. **Streak Breaking**: Missing a day breaks the streak (currentStreak resets to 0)
5. **Longest Streak**: Only updates when currentStreak exceeds it; never decreases

## UI State Model

**Component State** (activity.tsx):

```typescript
interface ActivityState {
  loading: boolean;           // True during initial data fetch
  error: string | null;       // Error message if fetch fails
  streaks: Streaks | null;    // Streak data from service
}
```

### State Transitions

```
Initial → Loading (useEffect mount)
Loading → Display (data loaded successfully)
Loading → Error (AsyncStorage read fails)
Display → Display (user returns to page, re-fetches)
```

## Data Flow

```
User Navigation
    ↓
activity.tsx mounts
    ↓
useEffect calls getCurrentStreaks()
    ↓
services/streaks.ts reads AsyncStorage
    ↓
Returns Streaks object
    ↓
Component renders stats
```

## Display Transformations

### Current Streak Display
- **Data**: `currentStreak: number`
- **Display**: "X day" (singular) or "X days" (plural)
- **Example**: `7` → "7 days"
- **Edge Case**: `0` → "0 days" or empty state message

### Longest Streak Display
- **Data**: `longestStreak: number`
- **Display**: "Best: X days"
- **Example**: `15` → "Best: 15 days"
- **Edge Case**: `0` → "No streak yet" or empty state

### Total Sessions Display
- **Data**: `totalDays: number`
- **Display**: "Total: X sessions"
- **Example**: `42` → "Total: 42 sessions"
- **Edge Case**: `0` → "Start your first meditation"

## Empty State Handling

**Condition**: `totalDays === 0` (new user, no sessions)

**Display**:
- Current Streak: "0 days"
- Longest Streak: "0 days"  
- Total Sessions: "0 sessions"
- Message: "Complete your first meditation to start your streak!"

## Data Persistence

- **Storage**: AsyncStorage (managed by Feature 1)
- **Key**: `@streaks` (from storage.ts)
- **Read-Only**: Activity page never writes streak data
- **Update Trigger**: Streaks update when user starts meditation session (player.tsx)

## Performance Considerations

- **Load Time**: AsyncStorage read is synchronous and fast (<50ms typically)
- **Target**: <500ms total page load (well within target)
- **Optimization**: No computation needed; direct display of service data
- **Caching**: React component state holds data until unmount (no unnecessary re-fetches)

## Data Accuracy

- **Source of Truth**: `services/streaks.ts` calculateStreaks() logic
- **Validation**: None needed in UI layer (service guarantees correctness)
- **Consistency**: 100% accuracy since reading directly from streak service

## Future Considerations (Out of Scope)

- Historical data (calendar view, session dates)
- Session duration tracking
- Achievement badges (noted in spec for future iteration)
- Editable streak data
- Export/backup functionality

## Related Entities (Context Only)

These entities exist in Feature 1 but are not directly used by the activity page:

- **SessionRun**: Individual meditation session records (stored separately)
- **Exercise**: Meditation exercise definitions (not displayed on activity page)
- **Preset**: Meditation preset configurations (not relevant to streaks display)

## Schema Validation

No new schema validation needed. The activity page consumes the existing validated Streaks interface from Feature 1.

---

**Status**: Data model defined (reuses Feature 1 entities)  
**Changes Required**: None (read-only display of existing data)  
**Dependencies**: Feature 1 Streaks entity and storage service
