# Tasks: Meditation Timer & Streaks (Expo)

Feature: 1-meditation-timer-streaks
Spec: ./spec.md
Plan: ./plan.md

## Phase 0 — Design Prototype (static UI)
- [ ] T001 Create base theme and UI kit (buttons, typography, colors) in apps/mobile/app/ui/
- [ ] T002 Build static screens (no business logic): SessionPreset, SessionPlayer, SessionSummary, LessonsList, LessonDetail in apps/mobile/app/screens/
- [ ] T003 Wire navigation between static screens in apps/mobile/app/_layout.tsx
- [ ] T004 Apply consistent spacing and styles per theme across static screens in apps/mobile/app/
Note: Execute Phase 0 after Setup (app scaffolding and navigation installed).

## Phase 1 — Setup
- [ ] T005 Initialize Expo app in apps/mobile (blank template)
- [ ] T006 Install deps in apps/mobile: @react-native-async-storage/async-storage, expo-av, expo-keep-awake
- [ ] T007 Create base structure in apps/mobile/app (screens/, services/, data/)
- [ ] T008 Configure TypeScript and strict checks in apps/mobile (tsconfig.json)
- [ ] T009 Add navigation (expo-router or react-navigation) in apps/mobile

## Phase 2 — Foundational
- [ ] T010 [P] Add mocked data files apps/mobile/app/data/lessons.json (8 lessons) and apps/mobile/app/data/presets.json (3/5/7 steps)
- [ ] T011 [P] Implement Storage service per contracts in apps/mobile/app/services/storage.ts
- [ ] T012 [P] Implement AudioService per contracts in apps/mobile/app/services/audio.ts
- [ ] T013 Add theme and a11y defaults (colors, sizes) in apps/mobile/app/theme.ts
- [ ] T014 Wire basic navigation routes (list/detail, session, summary) in apps/mobile/app/_layout.tsx

## Phase 3 — [US1] Start a Beginner session end-to-end
Goal: User selects preset and completes session with auto-advance, audio cues, and summary; credit day on start.
Independent test criteria:
- Can run Beginner preset from Start to Summary in ≤ 3 taps.
- Steps auto-advance with audible cue.
- Session summary shows total duration; day credited once.

- [ ] T015 [US1] Implement TimerService core (running/finished, wall-clock deltas) in apps/mobile/app/services/timer.ts
- [ ] T016 [P] [US1] Map presets.json → steps in TimerService (ordering, durations) in apps/mobile/app/services/timer.ts
- [ ] T017 [US1] Create SessionPreset screen UI in apps/mobile/app/screens/SessionPreset.tsx
- [ ] T018 [US1] Create SessionPlayer screen (countdown, reminder text, step index, sound toggle) in apps/mobile/app/screens/SessionPlayer.tsx
- [ ] T019 [P] [US1] Use expo-keep-awake during active session in apps/mobile/app/screens/SessionPlayer.tsx
- [ ] T020 [US1] Play audio cue on step end via AudioService in apps/mobile/app/screens/SessionPlayer.tsx
- [ ] T021 [US1] Create SessionSummary screen with total elapsed and gratitude message in apps/mobile/app/screens/SessionSummary.tsx
- [ ] T022 [US1] Record session start and credit day (local timezone) in apps/mobile/app/services/streaks.ts
- [ ] T023 [US1] Wire navigation: preset → player → summary in apps/mobile/app/_layout.tsx

## Phase 4 — [US2] Pause / Resume / Skip / Cancel
Goal: Control session playback with pause/resume/skip/cancel and correct state transitions.
Independent test criteria:
- Pause stops countdown; resume continues correctly.
- Skip advances immediately to next exercise; cancel stops and does not credit streak.

- [ ] T024 [US2] Extend TimerService with pause/resume/skip/cancel in apps/mobile/app/services/timer.ts
- [ ] T025 [P] [US2] Add controls to SessionPlayer (buttons, disabled states) in apps/mobile/app/screens/SessionPlayer.tsx
- [ ] T026 [US2] Reconcile timer on app foreground using AppState in apps/mobile/app/screens/SessionPlayer.tsx

## Phase 5 — [US3] Knowledge Base (8 lessons)
Goal: User can browse 8 lessons, view details, and navigate back.
Independent test criteria:
- Exactly 8 lessons listed; each detail view renders title and content.

- [ ] T027 [US3] Build LessonsList screen with titles/summaries in apps/mobile/app/screens/LessonsList.tsx
- [ ] T028 [P] [US3] Build LessonDetail screen in apps/mobile/app/screens/LessonDetail.tsx
- [ ] T029 [US3] Load lessons.json and connect navigation in apps/mobile/app/screens/LessonsList.tsx

## Phase 6 — [US4] Streaks display and boundaries
Goal: Compute and display current, longest, and total meditating days; credit per day based on session start.
Independent test criteria:
- Day credited once per local calendar day.
- Midnight crossing does not double credit; uses start time date.

- [ ] T030 [US4] Implement StreakService (getStreaks, recordSessionStart, reset) in apps/mobile/app/services/streaks.ts
- [ ] T031 [P] [US4] Show streaks on Summary screen (current/longest/total) in apps/mobile/app/screens/SessionSummary.tsx
- [ ] T032 [US4] Add small StreaksBanner component for reuse in apps/mobile/app/components/StreaksBanner.tsx

## Final Phase — Polish & Cross-Cutting
- [ ] T033 [P] Add accessibility labels/roles and ensure 44x44pt targets across screens in apps/mobile/app/screens/*
- [ ] T034 [P] Handle audio blocked/muted gracefully with visible transition in apps/mobile/app/screens/SessionPlayer.tsx
- [ ] T035 [P] Add basic error boundaries/toasts for unexpected failures in apps/mobile/app/
- [ ] T036 Review color contrast and scalable text settings in apps/mobile/app/
- [ ] T037 Ensure no network requests; bundle all data; offline check in apps/mobile/app/
- [ ] T038 Verify iOS and Android builds run locally (Expo) in apps/mobile/

## Dependencies (Story Order)
1. Setup → Design Prototype → Foundational → US1 → US2 → US3 → US4 → Polish
2. Design Prototype depends on Setup (project initialized, navigation present)
3. US1 depends on Foundational (storage, audio, data, navigation)
4. US2 depends on US1 (TimerService present)
5. US3 independent of US2/US4; depends on Foundational (data)
6. US4 depends on US1 (session start credit) and Storage

## Parallel Execution Examples
- In Foundational: T010, T011, T012 can proceed in parallel.
- In US1: T016 and T019 can proceed in parallel after T015 scaffolding.
- In US2: T025 can proceed in parallel with T026 once T024 is defined.
- In US3: T028 can proceed in parallel with T029 UI wiring.
- In Polish: T033–T037 can proceed in parallel.

## Implementation Strategy
- MVP first: Deliver US1 end-to-end, then US2 controls, followed by US3 lessons and US4 streaks.
- Keep services small and testable; mock data bundled.
- Avoid scope creep (no preset customization in MVP).
