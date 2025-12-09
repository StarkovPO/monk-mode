# Research: Achievement System Design

**Feature**: User Achievements System  
**Date**: 2025-12-09  
**Purpose**: Document research findings and design decisions for achievement implementation

## Research Questions

### 1. How should achievements be stored locally?

**Options Considered**:
1. Separate AsyncStorage key per achievement
2. Single JSON object with all achievements
3. Embed in existing streaks storage
4. SQLite database

**Decision**: Single JSON object in AsyncStorage at `@monk_mode:achievements`

**Rationale**:
- Consistent with existing pattern (streaks use `@monk_mode:streaks`)
- Single atomic read/write operation
- Easy to reset/clear with app data
- Lightweight (~1-2KB for 15 achievements)
- No additional dependencies (AsyncStorage already in use)

**Implementation**:
```typescript
interface AchievementsData {
  achievements: Achievement[];
  version: number;  // for schema migrations
}

// Storage key
const ACHIEVEMENTS_KEY = '@monk_mode:achievements';
```

---

### 2. When and how should achievements be checked/unlocked?

**Options Considered**:
1. Poll/check on every app open
2. Background timer checking periodically
3. Event-driven: check after user actions
4. Real-time observers on data changes

**Decision**: Event-driven checks after existing user actions

**Rationale**:
- Piggybacks on existing data flow (sessions, streaks)
- No polling overhead or battery drain
- Immediate feedback to user
- Aligns with offline-first principle
- Simple integration points

**Integration Points**:
- After session complete (in `summary.tsx`)
- After streak update (in `services/streaks.ts`)
- After lesson complete (in `lessons/[id].tsx`) - P2

**Implementation**:
```typescript
// In summary.tsx after session saves
const newUnlocks = await checkAndUnlockAchievements({
  type: 'session_complete',
  totalSessions: streaks.totalDays,
  currentStreak: streaks.currentStreak
});

if (newUnlocks.length > 0) {
  showCelebration(newUnlocks);  // P3
}
```

---

### 3. How should emoji icons be rendered consistently across platforms?

**Options Considered**:
1. Custom SVG/PNG images
2. Icon font library (FontAwesome, Material Icons)
3. Native Unicode emoji
4. Animated Lottie files

**Decision**: Native Unicode emoji

**Rationale**:
- No image assets to manage
- Native rendering on iOS and Android
- Accessible to VoiceOver/TalkBack
- Consistent with existing app style (uses emojis in empty states)
- Zero bytes added to bundle size
- Easy to change/update (just change string)

**Emoji Selected**:
- 🧘 First Step
- 🔥 Weekly Warrior
- 🌟 Mindful Month
- 💪 Committed
- 🎯 Dedicated
- 📚 Student of Stillness

**Accessibility**:
```typescript
<Text
  accessible={true}
  accessibilityLabel={`${achievement.name} achievement, ${unlocked ? 'unlocked' : 'locked'}`}
  accessibilityRole="button"
>
  {achievement.emoji}
</Text>
```

---

### 4. Should achievements be user-definable or predefined?

**Options Considered**:
1. User creates custom achievements
2. Predefined with user progress tracking
3. Hybrid: predefined + custom slots
4. Dynamic achievements from backend

**Decision**: Predefined achievements in code

**Rationale**:
- MVP scope: simpler implementation
- No UI for achievement creation needed
- No validation/moderation concerns
- Easier to test and maintain
- Can add custom achievements in future iteration
- Aligns with offline-first (no backend)

**Implementation**:
```typescript
// Static definitions in services/achievements.ts
export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  {
    id: 'first_step',
    name: 'First Step',
    emoji: '🧘',
    description: 'Complete your first meditation',
    unlockType: 'session_count',
    unlockValue: 1
  },
  // ... more definitions
];
```

---

### 5. How to handle locked vs unlocked visual states?

**Options Considered**:
1. Different emoji for locked vs unlocked
2. Grayscale filter on locked
3. Opacity reduction on locked
4. Question mark/lock icon overlay
5. Completely hide locked achievements

**Decision**: Opacity reduction (0.3) + dimmed text for locked

**Rationale**:
- Shows users what's possible (discovery)
- Consistent with spec requirement "visually distinguish"
- Simple CSS/style implementation
- Works well with emoji (native grayscale support)
- Maintains same grid layout

**Implementation**:
```typescript
<Text style={{
  fontSize: 48,
  opacity: unlocked ? 1 : 0.3,
  filter: unlocked ? 'none' : 'grayscale(100%)'  // iOS/web
}}>
  {emoji}
</Text>

<Text style={{
  color: unlocked ? '#1A1A1A' : '#999999'
}}>
  {name}
</Text>
```

---

### 6. How to calculate progress toward multi-step achievements?

**Options Considered**:
1. Real-time calculation from source data (streaks, sessions)
2. Cache progress in achievement storage
3. Both: cache with recalculation on demand

**Decision**: Real-time calculation from source data

**Rationale**:
- Single source of truth (streaks/sessions data)
- No sync issues between progress and actual data
- Simpler data model
- Progress only shown on tap (P2), not performance-critical

**Implementation**:
```typescript
function getAchievementProgress(achievement: AchievementDefinition): {
  current: number;
  required: number;
  percentage: number;
} {
  const streaks = await getStreaks();
  
  switch (achievement.unlockType) {
    case 'session_count':
      return {
        current: streaks.totalDays,
        required: achievement.unlockValue as number,
        percentage: (streaks.totalDays / (achievement.unlockValue as number)) * 100
      };
    case 'streak_days':
      return {
        current: streaks.currentStreak,
        required: achievement.unlockValue as number,
        percentage: (streaks.currentStreak / (achievement.unlockValue as number)) * 100
      };
    // ...
  }
}
```

---

## Best Practices Research

### Achievement Design Patterns

From studying Duolingo, Headspace, Calm, and Streaks apps:

**Key Findings**:
1. **Clear Unlock Criteria**: Users need to know exactly what to do
2. **Visual Feedback**: Locked state should still show what's achievable
3. **Immediate Rewards**: Unlock moment should feel special
4. **Progress Visibility**: Show how close user is to next achievement
5. **Accessibility**: Support screen readers and high contrast modes

**Applied to Our Design**:
- ✅ Clear descriptions (P2: tap to view)
- ✅ Locked achievements visible (opacity + gray)
- ✅ Unlock celebration (P3)
- ✅ Progress shown in detail view (P2)
- ✅ VoiceOver labels on all achievements

### Mobile Storage Patterns

From React Native best practices:

**Findings**:
- AsyncStorage recommended for <6MB of data
- JSON.parse/stringify sufficient for small datasets
- Batch reads/writes for performance
- Include version number for migrations

**Applied**:
- Single JSON object (~1-2KB)
- Version field for future schema changes
- Piggyback on existing storage operations

---

## Performance Analysis

**Storage Size Estimate**:
```
15 achievements × ~80 bytes = ~1.2KB
+ overhead = ~2KB total
```

**Read/Write Frequency**:
- Read: Once per activity page load (~1-2 times per session)
- Write: Once per session complete (when achievements unlock)
- Impact: Negligible (AsyncStorage handles KB-sized data instantly)

**Unlock Check Performance**:
```
O(n) where n = number of achievement definitions (~15)
Each check: ~0.1ms
Total per session: <2ms
```

---

## Alternative Approaches Rejected

### 1. Backend-Driven Achievements
**Why Rejected**: Requires network, contradicts offline-first principle, adds complexity

### 2. Achievement Progress Caching
**Why Rejected**: Adds sync complexity, source data is already fast to read

### 3. Custom Image Assets
**Why Rejected**: Larger bundle, asset management overhead, emoji works fine

### 4. Complex Animation Framework
**Why Rejected**: MVP doesn't need Lottie/complex animations; simple fade-in sufficient (P3)

---

## Open Questions (None Remaining)

All research questions resolved. Ready for implementation.

---

## References

- AsyncStorage docs: https://react-native-async-storage.github.io/async-storage/
- React Native accessibility: https://reactnative.dev/docs/accessibility
- Emoji Unicode standard: https://unicode.org/emoji/
- Existing project patterns: `specs/1-meditation-timer-streaks/`, `specs/2-streak-page/`
