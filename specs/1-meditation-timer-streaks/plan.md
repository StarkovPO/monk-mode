# Implementation Plan: Meditation Timer & Streaks (Expo)

ID: 1-meditation-timer-streaks
Spec: ./spec.md
Constitution: ../../.specify/memory/constitution.md

## Technical Context
- Platform: Mobile (iOS, Android) via Expo (React Native, managed workflow).
- Storage: On-device via AsyncStorage (no database).
- Audio: expo-av for simple beep cue; optional vibration fallback.
- Timer: JS timers with wall-clock diff (Date.now) + reconciliation on AppState resume.
- State: Local component state + simple services; no backend.
- A11Y: RN accessibility props; large touch targets; sufficient contrast.
- Internationalization: English only (MVP).
- Offline: All content bundled and mocked.
- Streaks: Credit day on session start using device local timezone; track current/longest/total.

## Constitution Check
- Mobile-First, Offline-Ready: PASS (Expo, offline data).
- Accessibility & Simplicity: PASS (targets set; to verify in QA).
- Test-First MVP Scope: PASS (no custom presets; tests for timer/streaks planned).
- Performance & Reliability: PASS (±1 sec/min target; background handling planned).
- Privacy by Default: PASS (no PII, no analytics, on-device only).

Gate: PASS (no violations).

## Phase 0: Outline & Research
See ./research.md
- Expo vs RN CLI vs Flutter → Expo chosen.
- Timer accuracy patterns in RN/Expo.
- AsyncStorage usage patterns and limits.
- Audio cue playback via expo-av and OS quirks.
- AppState handling for pause/resume and backgrounding.

## Phase 1: Design & Contracts
Artifacts:
- Data Model: ./data-model.md
- Contracts: ./contracts/*
- Quickstart: ./quickstart.md

Design notes:
- Mock content (8 lessons) as JSON module.
- Presets fixed: 3/5/7 steps with durations and reminder text.
- Services: TimerService, StreakService, Storage, Audio.
- UI: Lessons list/detail; Session preset picker; In-session player; Summary.

## Phase 2: Implementation Plan
- Milestone 0: UI design prototype (static screens and navigation; no business logic). Screens: SessionPreset, SessionPlayer, SessionSummary, LessonsList, LessonDetail. Consistent buttons, typography, and basic theming.
- Milestone 1: Project bootstrap (Expo), packages, folder structure, mock data.
- Milestone 2: Timer engine + audio cues + UI (start/pause/resume/skip/cancel).
- Milestone 3: Streaks persistence and summary screen.
- Milestone 4: Knowledge base views.
- Milestone 5: A11Y pass, QA, and polishing.

## Risks & Mitigations
- Background throttling → reconcile with wall-clock on resume; keep screen awake during session (expo-keep-awake).
- Audio blocked/muted → visual cue and continue.
- Timer drift → periodic resync using Date.now.

## Definition of Done
- All Success Criteria in spec met.
- Checklist passes.
- iOS and Android builds run locally via Expo.
- No regressions in core flows.
