# Implementation Plan: Meditation Timer & Streaks (Expo)

ID: 1-meditation-timer-streaks
Spec: ./spec.md
Constitution: ../../.specify/memory/constitution.md

## Technical Context
- **Platform**: Mobile (iOS, Android) via Expo managed workflow (SDK 54+)
- **Framework**: React Native with Expo Router (file-based routing)
- **Storage**: @react-native-async-storage/async-storage for persistence
- **Audio**: expo-av for audio cues (single beep on step transitions)
- **Timer**: JavaScript setInterval with Date.now() reconciliation on resume
- **State**: React hooks (useState, useEffect) with simple service modules
- **Screen Awake**: expo-keep-awake to prevent sleep during active sessions
- **Design**: Minimalistic light color scheme (#FAFAFA background, #1A1A1A primary)
- **Offline**: All content bundled; no network requests
- **Streaks**: Track session starts using device local timezone; count days, current/longest streaks

## Constitution Check
- ✅ Mobile-First, Offline-Ready: Expo with local data and AsyncStorage
- ✅ Accessibility & Simplicity: Large touch targets, clear hierarchy, accessible labels
- ✅ Test-First MVP Scope: Fixed presets only; manual testing per acceptance criteria
- ✅ Performance & Reliability: Timer accuracy ±1 sec/min; AppState handling for background
- ✅ Privacy by Default: No PII, no analytics, no network; on-device only

**Gate: PASS** (no violations)

## Current Status (Phase 0 Complete)

### ✅ Completed
- Expo project initialized at `apps/mobile/`
- Expo Router configured with `<Slot />` layout
- UI design complete: minimalistic light theme with clean navigation
- All 6 screens implemented with static content:
  - `app/index.tsx` - Home (Start Session, Browse Lessons)
  - `app/preset.tsx` - Select level (Beginner/Experienced/Advanced)
  - `app/player.tsx` - Session player with controls
  - `app/summary.tsx` - Post-session summary with stats
  - `app/lessons/index.tsx` - List of 8 lessons
  - `app/lessons/[id].tsx` - Lesson detail view
- Navigation working end-to-end
- Back buttons on all sub-pages
- Consistent styling and spacing

### 🚧 In Progress / Pending
- Mock data files (lessons, exercises, presets)
- Timer engine with countdown logic
- Audio cues on step transitions
- Pause/resume/skip/cancel functionality
- AsyncStorage integration for streaks
- Streak calculation and display
- AppState handling for backgrounding
- Full lesson content (currently 3 lessons have content, 5 placeholder)

## Implementation Phases

### Phase 1: Foundation & Data
**Goal**: Set up data layer and service modules

**Tasks**:
1. Create mock data files:
   - `app/data/lessons.ts` - 8 lessons with full content
   - `app/data/exercises.ts` - Exercise definitions with durations and reminders
   - `app/data/presets.ts` - 3 preset configurations (Beginner/Experienced/Advanced)
2. Create service modules:
   - `app/services/storage.ts` - AsyncStorage wrapper for streaks/sessions
   - `app/services/audio.ts` - Audio cue playback via expo-av
   - `app/services/timer.ts` - Timer state management
   - `app/services/streaks.ts` - Streak calculation logic

### Phase 2: Timer & Session Flow
**Goal**: Implement working meditation timer with auto-advance

**Tasks**:
1. Wire preset selection to pass preset ID to player
2. Implement timer countdown in `app/player.tsx`:
   - Load preset exercises
   - Start countdown from exercise duration
   - Update display every second
   - Auto-advance to next exercise on completion
3. Play audio cue on step transition
4. Use expo-keep-awake to prevent screen sleep
5. Track session start time (local timezone)
6. Navigate to summary on completion with real stats

**Acceptance**: Complete Beginner session (3 exercises, ~15 min) with auto-advance and audio

### Phase 3: Session Controls
**Goal**: Add pause, resume, skip, and cancel functionality

**Tasks**:
1. Implement pause/resume in timer service:
   - Save paused time
   - Reconcile elapsed time on resume
2. Implement skip to next exercise
3. Implement cancel (exit without saving)
4. Handle AppState changes (background/foreground)
5. Add sound toggle (mute/unmute)

**Acceptance**: Can pause, resume, skip during session; timer state persists correctly

### Phase 4: Streaks & Persistence
**Goal**: Track meditation days and display streaks

**Tasks**:
1. Save session start timestamp on first exercise start
2. Calculate day credit based on local calendar day
3. Store streak data in AsyncStorage:
   - Last credited date
   - Current streak count
   - Longest streak count
   - Total days meditated
4. Display streaks on summary screen
5. Handle midnight boundary correctly (credit based on start time)

**Acceptance**: Day credited once per calendar day; streaks displayed accurately

### Phase 5: Knowledge Base
**Goal**: Complete lesson content and display

**Tasks**:
1. Add full content for remaining 5 lessons (currently placeholders)
2. Ensure all 8 lessons are accessible from list
3. Verify lesson detail rendering with proper formatting

**Acceptance**: All 8 lessons viewable with complete content

### Phase 6: Polish & QA
**Goal**: Refinement and edge case handling

**Tasks**:
1. Add accessibility labels to all interactive elements
2. Ensure touch targets meet 44pt minimum
3. Handle audio permission denied gracefully
4. Add visual transition indicator if audio fails
5. Test timer accuracy (±1 sec/min)
6. Test across iOS and Android simulators
7. Verify offline operation (no network calls)
8. Test midnight boundary scenarios
9. Test app backgrounding during session

**Acceptance**: All acceptance criteria from spec met; no critical bugs

## Data Model

### Lesson
```typescript
{ id: string, title: string, summary: string, content: string }
```

### Exercise
```typescript
{ id: string, name: string, durationSec: number, reminderText: string }
```

### Preset
```typescript
{ id: string, label: string, exerciseIds: string[], totalDurationMin: number }
```

### SessionRun
```typescript
{ id: string, presetId: string, startTime: string (ISO), endTime: string | null, 
  completedExercises: number, totalExercises: number, elapsedSec: number }
```

### Streaks
```typescript
{ lastCreditedDate: string (YYYY-MM-DD), currentStreak: number, 
  longestStreak: number, totalDays: number }
```

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Timer drift in background | High | Use Date.now() reconciliation; expo-keep-awake during session |
| Audio blocked by OS | Medium | Continue silently with visual indicator |
| App killed during session | Medium | Offer resume from last step if available; accept data loss |
| Midnight boundary edge cases | Low | Use session start time only; store ISO timestamps |
| AsyncStorage quota | Low | Minimal data footprint (~KB); clear old sessions if needed |

## Definition of Done

### Per Phase
- All tasks completed
- Acceptance criteria met
- Manual testing passed
- No new runtime errors

### Overall Feature
- ✅ AC-1: 8 lessons visible and viewable
- ✅ AC-2: Three presets selectable; auto-advance with audio cues
- ✅ AC-3: Session summary shows duration and gratitude
- ✅ AC-4: Streaks display current, longest, and total days
- ✅ AC-5: All data mocked; works offline
- ✅ SC-1: Complete session in ≤3 taps
- ✅ SC-2: Timer accuracy ±1 sec/min (95% of runs)
- ✅ SC-3: All 8 lessons accessible on first load
- ✅ SC-4: Streaks 95% accurate across midnight tests
- ✅ SC-5: No network requests required

## Next Steps
1. Begin Phase 1: Create mock data and service modules
2. Implement timer engine in Phase 2
3. Progress through phases sequentially
4. Test thoroughly before considering complete
