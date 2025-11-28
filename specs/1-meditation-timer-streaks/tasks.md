# Tasks: Meditation Timer & Streaks (Expo)

Feature: 1-meditation-timer-streaks
Spec: ./spec.md
Plan: ./plan.md

## Status Legend
- ✅ = Completed
- 🚧 = In Progress
- ⏸️ = Blocked
- ⭕ = Not Started

---

## Phase 0 — UI Design & Navigation ✅ COMPLETE

### Setup & Infrastructure
- ✅ T001 Initialize Expo app in apps/mobile/ (SDK 54+)
- ✅ T002 Install dependencies: @react-native-async-storage/async-storage, expo-av, expo-keep-awake, expo-router
- ✅ T003 Configure Expo Router with minimal _layout.tsx using `<Slot />`
- ✅ T004 Configure TypeScript with strict mode in tsconfig.json

### UI Screens (Static Design)
- ✅ T005 Build Home screen with minimalistic light design in apps/mobile/app/index.tsx
- ✅ T006 Build Preset selection screen with 3 levels in apps/mobile/app/preset.tsx
- ✅ T007 Build Player screen with timer, controls, and instructions in apps/mobile/app/player.tsx
- ✅ T008 Build Summary screen with stats and streaks display in apps/mobile/app/summary.tsx
- ✅ T009 Build Lessons list screen with 8 lessons in apps/mobile/app/lessons/index.tsx
- ✅ T010 Build Lesson detail screen with dynamic routing in apps/mobile/app/lessons/[id].tsx

### Navigation & Theme
- ✅ T011 Wire navigation between all screens (Home → Preset → Player → Summary → Home)
- ✅ T012 Add back buttons to all sub-screens
- ✅ T013 Apply consistent light theme (#FAFAFA bg, #1A1A1A primary, #FFFFFF cards)
- ✅ T014 Ensure all screens use consistent spacing, typography, and button styles

**Phase 0 Acceptance**: ✅ All screens render, navigation works end-to-end, consistent design

---

## Phase 1 — Foundation & Data ⭕ NOT STARTED

**Goal**: Create mock data and service modules for business logic

### Mock Data
- ⭕ T101 Create exercises data file with 10+ exercises in apps/mobile/app/data/exercises.ts
  - Each exercise: { id, name, durationSec, reminderText }
  - Example: "Breath Awareness" - 300 sec - "Focus on your natural breath..."
  
- ⭕ T102 Create presets data file with 3 configurations in apps/mobile/app/data/presets.ts
  - Beginner: 3 exercises (~15 min total)
  - Experienced: 5 exercises (~25 min total)
  - Advanced: 7 exercises (~50 min total)
  
- ⭕ T103 Complete lessons data with all 8 full lessons in apps/mobile/app/lessons/[id].tsx
  - Currently only 3 lessons have content; add 5 more
  - Each lesson: title, summary, and detailed content (~200-300 words)

### Service Modules
- ⭕ T104 Create Storage service wrapper for AsyncStorage in apps/mobile/app/services/storage.ts
  - Methods: getStreaks(), saveStreaks(), getLastSession(), saveSession()
  - Keys: '@monk_mode:streaks', '@monk_mode:last_session'
  
- ⭕ T105 Create Audio service for beep cues in apps/mobile/app/services/audio.ts
  - Load beep sound using expo-av
  - Method: playTransitionBeep()
  - Handle audio permission errors gracefully
  
- ⭕ T106 Create Timer service for countdown logic in apps/mobile/app/services/timer.ts
  - State: currentExerciseIndex, remainingSec, isPaused, isFinished
  - Methods: start(), pause(), resume(), skip(), cancel()
  - Use Date.now() for wall-clock reconciliation
  
- ⭕ T107 Create Streaks service for day counting in apps/mobile/app/services/streaks.ts
  - Method: recordSessionStart(timestamp) → updates streaks if new day
  - Method: calculateStreaks(sessions) → returns { current, longest, total }
  - Handle midnight boundary using local timezone

**Phase 1 Acceptance**: All data files created, services implemented and testable

---

## Phase 2 — Timer & Session Flow ⭕ NOT STARTED

**Goal**: Implement working timer with auto-advance through exercises

- ⭕ T201 Pass selected preset ID from preset screen to player via route params
- ⭕ T202 Load preset exercises in player screen on mount
- ⭕ T203 Initialize timer with first exercise duration
- ⭕ T204 Implement countdown logic (update every second using setInterval)
- ⭕ T205 Display current exercise name, reminder text, and remaining time
- ⭕ T206 Show exercise progress (e.g., "Exercise 1 of 3")
- ⭕ T207 Play audio cue when exercise completes (call AudioService)
- ⭕ T208 Auto-advance to next exercise after audio cue
- ⭕ T209 Use expo-keep-awake to prevent screen sleep during session
- ⭕ T210 Track total elapsed time across all exercises
- ⭕ T211 Record session start timestamp (local timezone) on first exercise start
- ⭕ T212 Navigate to summary screen when all exercises complete
- ⭕ T213 Pass session data to summary (duration, completed exercises, preset info)

**Phase 2 Acceptance**: 
- ✅ Can complete Beginner session (3 exercises, ~15 min) end-to-end
- ✅ Audio beep plays between exercises
- ✅ Timer counts down accurately (±1 sec/min)
- ✅ Auto-advances without user interaction

**Test**: Select Beginner → Start → Wait through 3 exercises → See summary

---

## Phase 3 — Session Controls ⭕ NOT STARTED

**Goal**: Add pause, resume, skip, and cancel functionality

- ⭕ T301 Implement pause functionality in timer service
  - Save paused time using Date.now()
  - Stop setInterval
  
- ⭕ T302 Implement resume functionality in timer service
  - Calculate elapsed time during pause
  - Resume countdown from saved time
  
- ⭕ T303 Implement skip functionality
  - Move to next exercise immediately
  - Play transition beep
  - Reset timer for new exercise
  
- ⭕ T304 Implement cancel functionality
  - Stop timer
  - Navigate back without saving session
  - Confirm via alert/modal
  
- ⭕ T305 Wire pause/resume button in player UI
  - Toggle button text and icon
  - Disable during transitions
  
- ⭕ T306 Wire skip button in player UI
  - Confirm if more than 50% of exercise remaining
  
- ⭕ T307 Handle AppState changes (background/foreground)
  - Auto-pause when app backgrounds
  - Show resume option when foregrounding
  - Reconcile time using Date.now()
  
- ⭕ T308 Add sound toggle (mute/unmute)
  - Store preference in state
  - Persist across app sessions (AsyncStorage)

**Phase 3 Acceptance**:
- ✅ Pause stops countdown; resume continues from correct time
- ✅ Skip moves to next exercise immediately
- ✅ Cancel exits without saving
- ✅ App handles backgrounding gracefully

**Test**: Start session → Pause → Wait 10 sec → Resume → Skip → Complete

---

## Phase 4 — Streaks & Persistence ⭕ NOT STARTED

**Goal**: Track meditation days and display accurate streaks

- ⭕ T401 Save session start timestamp on first exercise start
- ⭕ T402 On session start, call StreakService.recordSessionStart()
- ⭕ T403 Calculate if current day was already credited
  - Extract date (YYYY-MM-DD) from local timestamp
  - Compare with lastCreditedDate from AsyncStorage
  
- ⭕ T404 Update streak data if new day:
  - If consecutive day: increment currentStreak
  - If streak broken: reset currentStreak to 1
  - Update longestStreak if current exceeds it
  - Increment totalDays
  - Save lastCreditedDate
  
- ⭕ T405 Load and display streaks on summary screen
  - Show current streak, longest streak, total days
  - Format nicely with icons (🔥 for streak)
  
- ⭕ T406 Handle midnight boundary edge case
  - Use session start time only (not end time)
  - Test: Start session at 11:59 PM → Cross midnight → Day credit based on 11:59 PM
  
- ⭕ T407 Add "View Streaks" or stats display on home screen (optional enhancement)

**Phase 4 Acceptance**:
- ✅ Day credited once per calendar day
- ✅ Current streak increments on consecutive days
- ✅ Longest streak tracks all-time best
- ✅ Total days counts unique meditation days
- ✅ Midnight crossing handled correctly

**Test**: Complete session on Day 1 → Complete on Day 2 → Skip Day 3 → Complete Day 4

---

## Phase 5 — Knowledge Base Completion ⭕ NOT STARTED

**Goal**: Complete all 8 lesson contents

- ⭕ T501 Write lesson 4: "Loving Kindness" content (~250 words)
- ⭕ T502 Write lesson 5: "Mindful Walking" content (~250 words)
- ⭕ T503 Write lesson 6: "Visualization" content (~250 words)
- ⭕ T504 Write lesson 7: "Sound Meditation" content (~250 words)
- ⭕ T505 Write lesson 8: "Open Awareness" content (~250 words)
- ⭕ T506 Verify all 8 lessons display correctly from list
- ⭕ T507 Ensure lesson detail formatting is readable (line spacing, bullets, paragraphs)

**Phase 5 Acceptance**:
- ✅ All 8 lessons accessible from lessons list
- ✅ Each lesson has complete, high-quality content
- ✅ Content is formatted and readable

**Test**: Browse Lessons → Open each of 8 lessons → Verify content quality

---

## Phase 6 — Polish & QA ⭕ NOT STARTED

**Goal**: Refinement, accessibility, and edge case handling

### Accessibility
- ⭕ T601 Add accessibility labels to all buttons and interactive elements
- ⭕ T602 Ensure all touch targets are at least 44x44 pt
- ⭕ T603 Test with VoiceOver (iOS) and TalkBack (Android)
- ⭕ T604 Verify color contrast meets WCAG AA standards

### Edge Cases & Error Handling
- ⭕ T605 Handle audio permission denied
  - Show toast/alert explaining audio unavailable
  - Continue session silently with visual transitions
  
- ⭕ T606 Add visual transition indicator (flash/animation) if audio fails
- ⭕ T607 Handle app killed during session
  - Detect incomplete session on next launch
  - Offer to resume or discard
  
- ⭕ T608 Handle AsyncStorage errors gracefully
  - Show user-friendly error messages
  - Don't crash app

### Testing & Validation
- ⭕ T609 Test timer accuracy: Run 15-min session, measure actual time (should be ±15 sec)
- ⭕ T610 Test on iOS simulator (multiple devices/versions)
- ⭕ T611 Test on Android simulator (multiple devices/versions)
- ⭕ T612 Verify no network requests made (check Network tab)
- ⭕ T613 Test midnight boundary scenario (mock system time if possible)
- ⭕ T614 Test app backgrounding during session (press home button)
- ⭕ T615 Test with low battery / power saving mode
- ⭕ T616 Full regression test of all user flows

### Final Polish
- ⭕ T617 Add loading states where appropriate
- ⭕ T618 Add empty states (e.g., if no streaks yet)
- ⭕ T619 Review and fix any layout issues on different screen sizes
- ⭕ T620 Add subtle animations/transitions for better UX (optional)

**Phase 6 Acceptance**:
- ✅ All accessibility criteria met
- ✅ All edge cases handled gracefully
- ✅ App tested on iOS and Android
- ✅ All spec acceptance criteria met
- ✅ No critical or high-priority bugs

---

## Implementation Strategy

### Execution Order
1. ✅ Phase 0: UI Design (COMPLETE)
2. Phase 1: Foundation & Data → **START HERE**
3. Phase 2: Timer & Session Flow
4. Phase 3: Session Controls
5. Phase 4: Streaks & Persistence
6. Phase 5: Knowledge Base Completion
7. Phase 6: Polish & QA

### Parallel Work Opportunities
- **Phase 1**: T101, T102, T103 (data files) can be done in parallel with T104-T107 (services)
- **Phase 2**: T209 (keep-awake) can be added in parallel with timer implementation
- **Phase 5**: All lesson writing tasks (T501-T505) can be done in parallel
- **Phase 6**: Most QA tasks (T609-T616) can be executed in parallel

### Definition of Done (Per Task)
- Code written and tested manually
- No new runtime errors or warnings
- Follows existing code style and patterns
- Acceptance criteria met (if specified)

### Definition of Done (Overall Feature)
- ✅ All 6 phases completed
- ✅ All acceptance criteria from spec.md met
- ✅ Manual testing completed and documented
- ✅ App runs without errors on iOS and Android
- ✅ Ready for user testing / deployment

---

## Next Actions
1. **Immediate**: Begin Phase 1, Task T101 (Create exercises data)
2. Build out all mock data files
3. Implement service modules
4. Move to Phase 2 timer implementation
