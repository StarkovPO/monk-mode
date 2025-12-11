# Feature: Meditation Timer & Streaks

ID: 1-meditation-timer-streaks

## Overview

Create a meditation app experience with:
- Knowledge base of 8 small lessons about meditation techniques.
- Smart timer linked to a sequence of meditation exercises, with audio cues, on-screen reminders, and automatic step transitions.
- Session presets for different experience levels: Beginners (3 exercises, ~15 min), Experienced (5 exercises, ~25–30 min), Advanced (7 exercises, ~50–60 min).
- Post-session summary (duration and completion) with a gratitude message.
- Streak tracking: count how many days the user meditates and record the time when the user starts meditation.

All data is mocked. No external feeds or backend required.

## Goals
- Provide structured content (8 lessons) to guide users through meditation techniques.
- Offer a guided timer that sequences exercises with minimal friction.
- Motivate consistency via streaks and day count.

## Non-Goals
- Real backend or user accounts.
- Social sharing, leaderboards, or community features.
- Complex analytics beyond local counts and streaks.

## Actors
- User
- Application (Timer engine, Content viewer, Streaks tracker)

## Assumptions
- Platform is a mobile app for iOS and Android (to be distributed via Google Play and App Store).
- Local persistence via on-device app storage is sufficient for MVP; clearing app data resets data.
- Default audio cue (single beep) is acceptable; user can mute within the session.
- A “day” is based on the device's local timezone.
- A day is counted if the user starts at least one meditation session that day.
- All lesson/exercise content, durations, and presets are mocked and bundled with the app.

## Scope
- 8-lesson knowledge base (list + detail views).
- Guided timer sessions using presets for Beginners, Experienced, Advanced.
- Per-exercise on-screen reminder text and audio signal at step end, then auto-advance.
- Session summary with total time and a gratitude message.
- Streaks: total meditating days, current streak, longest streak, and record of session start times (local time).
- Settings: toggle sound on/off during a session.

## Out of Scope
- User authentication or cloud sync.
- Custom user-defined presets (preset step durations and counts are fixed for MVP).
- Multi-device synchronization.

## User Scenarios & Testing

- Scenario A: Start a Beginner session
  - Given the user opens the app and selects Beginners preset
  - When the user taps Start
  - Then the first exercise appears with its reminder text and timer countdown
  - And when the step ends, an audio cue plays and the next exercise displays automatically
  - And after the final exercise, a session summary shows total duration and a gratitude message
  - And the app records the session start time (local) and credits the day toward streaks
  - Acceptance: Progresses through 3 steps; total duration ~15 min; day count increments once per calendar day; audio can be muted.

- Scenario B: Pause/Resume/Skip
  - Given a running session
  - When the user pauses, the timer stops advancing
  - When the user resumes, the timer continues from the paused time
  - When the user skips a step, the next exercise begins immediately with its reminder text and a fresh countdown
  - Acceptance: Timer state persists across pause/resume; skip triggers the correct next step; summary reflects exercises completed.

- Scenario C: View lessons
  - Given the user opens the Knowledge Base
  - When the user selects a lesson
  - Then the lesson detail displays title and content (mocked), with navigation back
  - Acceptance: Exactly 8 lessons are available; all are accessible and readable.

- Scenario D: Streak boundaries
  - Given the user starts a session just before midnight local time
  - When the session crosses midnight
  - Then the day credited is based on session start time (pre-midnight)
  - Acceptance: Only one day is credited per calendar day; crossing midnight does not double count.

## Functional Requirements

### Knowledge Base
- FR-KB-1: The app shall display a list of exactly 8 lessons with titles and short summaries.
- FR-KB-2: The app shall display a lesson detail view with title and full text content.
- FR-KB-3: The app shall use mocked, local data for all lessons.

### Timer & Exercises
- FR-TMR-1: The app shall provide three presets: Beginners (3 exercises), Experienced (5), Advanced (7).
- FR-TMR-2: The app shall define a fixed sequence of exercises per preset, each with a duration and reminder text.
- FR-TMR-3: The app shall show the active exercise name, reminder text, remaining time, and overall step index.
- FR-TMR-4: On step end, the app shall play an audio cue and automatically transition to the next exercise.
- FR-TMR-5: The app shall support Start, Pause, Resume, Skip, and Cancel actions.
- FR-TMR-6: The app shall show a final session summary including total elapsed time and completion status.
- FR-TMR-7: The app shall default to sound on, with a toggle to mute/unmute.
- FR-TMR-8: Timer accuracy shall be within ±1 second per minute under typical mobile device conditions.

### Session Summary & Gratitude
- FR-SUM-1: After the final exercise, the app shall show total session duration in minutes and seconds.
- FR-SUM-2: The app shall display a gratitude message.
- FR-SUM-3: The app shall show the number of exercises completed vs. scheduled.

### Streaks & Day Count
- FR-STR-1: The app shall record the local time when a session starts.
- FR-STR-2: The app shall count a day toward streaks if at least one session starts during that local calendar day.
- FR-STR-3: The app shall display current streak, longest streak, and total meditating days.
- FR-STR-4: The app shall persist streak data locally.

### Persistence & Mock Data
- FR-DAT-1: All lessons, exercises, and presets shall be seeded from mocked local data.
- FR-DAT-2: Streaks and last-session metadata shall be persisted in on-device app storage.
- FR-DAT-3: Clearing app data shall reset streaks and history.

### Accessibility & UX
- FR-A11Y-1: All interactive controls shall be accessible to assistive technologies and labeled appropriately.
- FR-A11Y-2: The app shall provide clear selection/focus states, sufficient color contrast, and touch targets that meet minimum size guidelines.
- FR-A11Y-3: If audio playback fails or is blocked, the app shall still advance steps and display a visible transition indicator.

## Success Criteria
- SC-1: A user can complete a full Beginners session end-to-end in ≤ 3 taps (Select preset → Start → Auto-advance to summary), excluding optional pause/skip.
- SC-2: Timer deviation ≤ ±1 sec/min under normal mobile device conditions for 95% of runs.
- SC-3: 100% of the 8 lessons are accessible and readable on first load.
- SC-4: Streaks reflect at least 95% accuracy across midnight boundary tests as defined in Scenario D.
- SC-5: No external network requests are required to complete all flows.

## Key Entities
- Lesson: { id, title, summary, content }
- Exercise: { id, name, defaultDurationSec, reminderText }
- Preset: { id, label, exerciseIds[], totalExpectedDuration }
- SessionRun: { id, presetId, startTimeLocalISO, endTimeLocalISO, stepsCompleted, totalElapsedSec }
- Streaks: { totalDays, currentStreak, longestStreak, lastCreditedDateLocal }

## Edge Cases
- App background or restart during session: app may lose in-progress timer state; on return, offer to resume last known step if available, otherwise allow restart.
- Audio blocked by OS settings: app continues silently with visual transition.
- Background throttling or low-power modes: timer may drift; summary uses app-tracked elapsed time.
- Crossing midnight: day credit based on session start time only.

## Dependencies
- None external; use mobile device APIs (timers, audio) only.

## Risks & Mitigations
- Timer drift due to OS background restrictions or low-power modes → show accuracy note; compute elapsed using wall-clock diffs on tick and reconcile on resume.
- Lost data if app data is cleared → disclosed in app; basic export/import is out of scope.

## Open Questions
- None at this time.

## Acceptance Criteria (Summary)
- AC-1: 8 lessons visible and viewable.
- AC-2: Three presets selectable; each runs sequences with reminders and audio cues; auto-advance works.
- AC-3: Session summary shows total duration and gratitude message.
- AC-4: Streaks display total days, current and longest streak; day credit on session start.
- AC-5: All data mocked; feature works offline (no network required).
