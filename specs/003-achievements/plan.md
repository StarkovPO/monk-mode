# Implementation Plan: User Achievements System

**Branch**: `3-achievements` | **Date**: 2025-12-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-achievements/spec.md`

## Summary

Implement a gamification system that rewards users with emoji-based achievement stickers for reaching meditation milestones. Users will see achievements on the activity page, with locked/unlocked states, tap-to-view details, and optional unlock celebrations. Achievements track first sessions, streak milestones (7/30 days), session counts (30/100), and lesson completions. All data stored locally via AsyncStorage, fully offline-capable, consistent with app's privacy-first design.

## Technical Context

**Language/Version**: TypeScript / React Native 0.81.5 with React 19.2.1  
**Primary Dependencies**: Expo SDK 54, Expo Router 6.0.15, @react-native-async-storage/async-storage 2.2.0  
**Storage**: AsyncStorage (key: `@monk_mode:achievements`), persists achievement state and unlock timestamps locally  
**Testing**: Manual testing against acceptance scenarios; unit tests for achievement unlock logic  
**Target Platform**: iOS 15+ and Android (Expo managed workflow)
**Project Type**: Mobile (React Native/Expo)  
**Performance Goals**: <1s page load, <500ms unlock celebration animation, immediate state updates  
**Constraints**: Fully offline-capable, no network calls, <50KB storage for achievement data, emoji-only icons (no custom images)  
**Scale/Scope**: 10-15 achievements in MVP, extensible system for future additions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ **Mobile-First, Offline-Ready**: Extends existing Expo mobile app; all achievement data stored in AsyncStorage; no backend required
- ✅ **Accessibility & Simplicity**: Large touch targets for achievement items, clear visual distinction (locked/unlocked), VoiceOver labels for emoji icons
- ✅ **Test-First MVP Scope**: Acceptance scenarios defined for each priority; manual testing sufficient; no custom achievement creation in MVP
- ✅ **Performance & Reliability**: Local storage reads/writes; lightweight JSON data; achievement checks run after existing session/streak updates
- ✅ **Privacy by Default**: All data on-device only; achievements cleared with app data reset; no analytics or tracking

**Gate: PASS** (no violations)

## Project Structure

### Documentation (this feature)

```text
specs/003-achievements/
├── plan.md              # This file (implementation strategy)
├── research.md          # Achievement patterns and storage design
├── data-model.md        # Achievement entity and state model
├── quickstart.md        # Developer guide for achievement system
├── checklists/
│   └── requirements.md  # Specification quality validation
└── spec.md              # Feature specification (user stories)
```

### Source Code (repository root)

```text
apps/mobile/
├── app/
│   ├── activity.tsx                    # [MODIFY] Add achievements section
│   ├── summary.tsx                      # [MODIFY] Trigger achievement checks after session
│   ├── services/
│   │   ├── achievements.ts             # [NEW] Achievement unlock logic
│   │   ├── storage.ts                  # [MODIFY] Add achievement storage keys
│   │   └── streaks.ts                  # [EXISTING] Used for streak-based achievements
│   ├── components/
│   │   ├── AchievementItem.tsx         # [NEW] Single achievement display
│   │   ├── AchievementGrid.tsx         # [NEW] Grid of all achievements
│   │   ├── AchievementDetail.tsx       # [NEW] Detail modal/overlay (P2)
│   │   ├── AchievementCelebration.tsx  # [NEW] Unlock animation (P3)
│   │   └── DebugPanel.tsx              # [EXISTING] Already has debug tools
│   └── types/
│       └── achievements.ts              # [NEW] TypeScript interfaces
└── package.json                         # [EXISTING] No new dependencies needed
```

**Structure Decision**: Mobile React Native app structure. All achievement logic lives in `services/achievements.ts`. UI components are modular and testable. Leverages existing storage service and streak tracking. No backend changes needed - fully client-side feature.

## Phase 0: Research

Key research topics completed:

1. **Achievement Storage Pattern**:
   - Decision: Single JSON object in AsyncStorage at `@monk_mode:achievements`
   - Rationale: Consistent with existing streak storage; single atomic read/write; easy to reset
   - Structure: `{ achievements: Achievement[], lastChecked: string }`

2. **Unlock Detection Strategy**:
   - Decision: Check achievements after existing events (session complete, streak update, lesson complete)
   - Rationale: Piggyback on existing data flow; no new polling/timers; immediate feedback
   - Implementation: Call `checkAndUnlockAchievements(eventType, context)` in summary screen, streak service

3. **Emoji Rendering Consistency**:
   - Decision: Use standard Unicode emoji (🧘🔥🌟💪🎯📚) directly in JSX
   - Rationale: No image assets needed; native rendering on iOS/Android; accessible to screen readers
   - Fallback: None needed - target platforms support emoji natively

4. **Achievement Definition Approach**:
   - Decision: Static array of achievement definitions in code (not user-editable)
   - Rationale: MVP scope; simpler than dynamic system; easy to extend later
   - Schema: `{ id, name, emoji, description, unlockType, unlockValue }`

See `research.md` for detailed findings.

## Phase 1: Design & Architecture

### Data Model

See `data-model.md` for complete entity definitions.

**Achievement Definition** (static, code-defined):
```typescript
interface AchievementDefinition {
  id: string;                    // e.g., 'first_step'
  name: string;                  // e.g., 'First Step'
  emoji: string;                 // e.g., '🧘'
  description: string;           // e.g., 'Complete your first meditation'
  unlockType: 'session_count' | 'streak_days' | 'lesson_complete';
  unlockValue: number | string;  // e.g., 1 for first session, 7 for week streak
}
```

**Achievement Progress** (stored in AsyncStorage):
```typescript
interface Achievement {
  id: string;           // matches definition ID
  unlocked: boolean;
  unlockedAt?: string;  // ISO timestamp
}

interface AchievementsData {
  achievements: Achievement[];
  version: number;      // schema version for migrations
}
```

### Service Architecture

**achievements.ts** exports:
- `getAllAchievements()`: Returns all achievements with unlock status
- `checkAndUnlockAchievements(event)`: Checks if any achievements should unlock
- `getAchievementProgress(id)`: Returns progress toward a specific achievement
- `resetAchievements()`: Clears all achievement data (for debugging)

**Integration points**:
- `summary.tsx`: Call `checkAndUnlockAchievements({ type: 'session_complete' })` after session
- `streaks.ts` (modify): Call `checkAndUnlockAchievements({ type: 'streak_update', value: streakCount })` when streak increases
- `lessons/[id].tsx` (future): Call `checkAndUnlockAchievements({ type: 'lesson_complete', lessonId })` when lesson read

### Component Hierarchy

**activity.tsx** modifications:
```
<SafeAreaView>
  <ScrollView>
    {/* Existing streak stats */}
    <AchievementGrid />  {/* NEW: P1 */}
  </ScrollView>
  <DebugPanel />  {/* Already exists */}
</SafeAreaView>
```

**AchievementGrid**:
```
<View>
  <Text>Achievements</Text>
  {achievements.map(achievement => (
    <AchievementItem
      achievement={achievement}
      onPress={() => setSelected(achievement)}  {/* P2 */}
    />
  ))}
</View>
```

**AchievementItem**:
```
<Pressable>
  <Text style={unlocked ? colorful : grayed}>{emoji}</Text>
  <Text>{name}</Text>
</Pressable>
```

### Visual Design

**Locked Achievement**:
- Emoji: Grayscale filter or opacity 0.3
- Border: Dashed gray outline
- Label: Dimmed text (#999999)

**Unlocked Achievement**:
- Emoji: Full color, normal size
- Border: Solid subtle border or none
- Label: Primary text (#1A1A1A)
- Optional: Subtle glow/shadow effect

**Grid Layout**:
- 3 items per row on phone, 4-5 on tablet
- Equal square cells with padding
- Scrollable if >2 rows

### Achievement Definitions (MVP)

| ID | Name | Emoji | Unlock Type | Value | Description |
|----|------|-------|-------------|-------|-------------|
| first_step | First Step | 🧘 | session_count | 1 | Complete your first meditation |
| weekly_warrior | Weekly Warrior | 🔥 | streak_days | 7 | Meditate 7 days in a row |
| mindful_month | Mindful Month | 🌟 | streak_days | 30 | Reach a 30-day streak |
| committed | Committed | 💪 | session_count | 30 | Complete 30 sessions |
| dedicated | Dedicated | 🎯 | session_count | 100 | Complete 100 sessions |
| student | Student of Stillness | 📚 | lesson_complete | all_basics | Read all meditation basics |

## Phase 2: Implementation Phases

### P1: Core Achievement Display (MVP)

**Files to create**:
1. `services/achievements.ts` - Achievement unlock logic
2. `types/achievements.ts` - TypeScript interfaces
3. `components/AchievementGrid.tsx` - Grid display
4. `components/AchievementItem.tsx` - Single item

**Files to modify**:
1. `activity.tsx` - Add `<AchievementGrid />` below stats
2. `services/storage.ts` - Add achievement storage key
3. `summary.tsx` - Call achievement check after session

**Acceptance Test**: View activity page with 0/1/7 sessions; verify correct achievements unlocked/locked

### P2: Achievement Details

**Files to create**:
1. `components/AchievementDetail.tsx` - Modal/overlay for details

**Files to modify**:
1. `components/AchievementItem.tsx` - Add onPress handler
2. `components/AchievementGrid.tsx` - Manage selected state

**Acceptance Test**: Tap locked/unlocked achievement; see name, description, progress/date

### P3: Unlock Celebrations

**Files to create**:
1. `components/AchievementCelebration.tsx` - Animation component

**Files to modify**:
1. `summary.tsx` - Show celebration on new unlock
2. `services/achievements.ts` - Return newly unlocked achievements

**Acceptance Test**: Complete first session; see "🧘 First Step Unlocked!" animation

### P2: Lesson Achievements

**Files to modify**:
1. `lessons/[id].tsx` - Track lesson completion
2. `services/achievements.ts` - Add lesson tracking logic

**Acceptance Test**: Complete all lessons; unlock "Student of Stillness"

## Testing Strategy

**Manual Testing** (primary for MVP):
1. Use DebugPanel to set test data (0/1/7/30/100 sessions)
2. Verify correct achievements unlock
3. Test on iOS and Android
4. Test locked/unlocked visual states
5. Test detail overlay (P2)
6. Test celebration animation (P3)

**Unit Tests** (optional, for unlock logic):
```typescript
test('unlocks First Step on first session', () => {
  const achievements = checkUnlocks({ type: 'session_count', value: 1 });
  expect(achievements).toContain('first_step');
});
```

## Performance Considerations

- Achievement check runs O(n) where n = number of achievements (~10-15)
- Storage read/write happens once per session (piggyback on existing streak save)
- Grid renders max 15 items; no virtualization needed
- Emoji rendering is native; no image loading

## Migration & Rollback

**Data Migration**: None needed (new feature, new storage key)

**Rollback**: Remove achievement grid from activity page; achievement data persists but unused

**Version Management**: Include `version: 1` in achievement data for future schema changes

## Future Enhancements (Out of MVP Scope)

- Achievement sharing/social features
- Custom achievement creation
- Achievement categories/filters
- Progress bars for multi-step achievements
- Sound effects on unlock
- Achievement history/timeline
- Rare/secret achievements

## Success Metrics

Implementation complete when:
- ✅ All P1 acceptance scenarios pass
- ✅ Achievement data persists across app restarts
- ✅ Page loads in <1 second
- ✅ Visual distinction clear between locked/unlocked
- ✅ iOS and Android both render emoji correctly
- ✅ No regressions to existing streak/session features

See `spec.md` for complete success criteria.

## Notes

- Achievements integrate with existing features (streaks, sessions, lessons)
- No new dependencies required
- Fully offline-capable
- Emoji-based icons avoid image asset management
- Extensible design for future achievement types
- Debug panel already exists for testing different states
