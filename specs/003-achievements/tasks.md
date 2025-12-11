---
description: "Implementation tasks for User Achievements System"
---

# Tasks: User Achievements System

**Input**: Design documents from `/specs/003-achievements/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md, quickstart.md

**Tests**: Manual testing using DebugPanel (no automated tests in MVP)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Mobile app**: `apps/mobile/app/`
- All paths are absolute from repository root

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create type definitions and storage infrastructure needed by all user stories

- [x] T001 [P] Create TypeScript interfaces in apps/mobile/app/types/achievements.ts
- [x] T002 Add achievement storage key constant to apps/mobile/app/services/storage.ts

**Checkpoint**: Type definitions ready - achievement implementation can begin

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core achievement service that MUST be complete before ANY user story UI can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Create achievement definitions array (ACHIEVEMENT_DEFINITIONS) in apps/mobile/app/services/achievements.ts
- [x] T004 Implement getAchievementsData() and saveAchievementsData() storage functions in apps/mobile/app/services/achievements.ts
- [x] T005 Implement getAllAchievements() to merge definitions with storage data in apps/mobile/app/services/achievements.ts
- [x] T006 Implement checkAndUnlockAchievements(event) unlock logic in apps/mobile/app/services/achievements.ts
- [x] T007 Implement getAchievementProgress(id) calculation in apps/mobile/app/services/achievements.ts
- [x] T008 [P] Implement isAchievementUnlocked(id) helper in apps/mobile/app/services/achievements.ts
- [x] T009 [P] Implement resetAchievements() debug helper in apps/mobile/app/services/achievements.ts

**Checkpoint**: Achievement service complete - UI components and integrations can now proceed in parallel

---

## Phase 3: User Story 1 - View Earned Achievements (Priority: P1) 🎯 MVP

**Goal**: Users can see all achievements (locked and unlocked) displayed as emoji stickers on the activity page with clear visual distinction

**Independent Test**: Navigate to activity page with 0/1/7/30 sessions and verify correct achievements show as locked/unlocked with appropriate visual states

### Implementation for User Story 1

- [x] T010 [P] [US1] Create AchievementItem component in apps/mobile/app/components/AchievementItem.tsx
- [x] T011 [P] [US1] Create AchievementGrid component in apps/mobile/app/components/AchievementGrid.tsx
- [x] T012 [US1] Add AchievementGrid to activity page in apps/mobile/app/activity.tsx
- [x] T013 [US1] Add achievement unlock check after session complete in apps/mobile/app/summary.tsx
- [x] T014 [US1] Style locked achievements (opacity 0.3, gray text) in apps/mobile/app/components/AchievementItem.tsx
- [x] T015 [US1] Style unlocked achievements (full color, primary text) in apps/mobile/app/components/AchievementItem.tsx
- [x] T016 [P] [US1] Add VoiceOver/accessibility labels to achievement items in apps/mobile/app/components/AchievementItem.tsx
- [x] T017 [US1] Test on iOS simulator with 0 sessions → verify all achievements locked
- [x] T018 [US1] Test with 1 session → verify "First Step" unlocked
- [x] T019 [US1] Test with 7-day streak → verify "Weekly Warrior" unlocked
- [x] T020 [US1] Test achievement persistence across app restarts

**Checkpoint**: User Story 1 complete - users can view and track their achievements. This is the MVP!

---

## Phase 4: User Story 2 - Discover Available Achievements (Priority: P2)

**Goal**: Users can tap any achievement to see details including name, description, unlock criteria (if locked), or earned date (if unlocked)

**Independent Test**: Tap locked and unlocked achievements and verify detail modal shows correct information for each state

### Implementation for User Story 2

- [x] T021 [P] [US2] Create AchievementDetail component modal in apps/mobile/app/components/AchievementDetail.tsx
- [x] T022 [US2] Add onPress handler to AchievementItem in apps/mobile/app/components/AchievementItem.tsx
- [x] T023 [US2] Add selected state management to AchievementGrid in apps/mobile/app/components/AchievementGrid.tsx
- [x] T024 [US2] Show achievement name and emoji in detail modal in apps/mobile/app/components/AchievementDetail.tsx
- [x] T025 [US2] Show description and unlock criteria for locked achievements in apps/mobile/app/components/AchievementDetail.tsx
- [x] T026 [US2] Show progress (e.g., "3/7 days") for locked achievements in apps/mobile/app/components/AchievementDetail.tsx
- [x] T027 [US2] Show earned date and celebration message for unlocked achievements in apps/mobile/app/components/AchievementDetail.tsx
- [x] T028 [US2] Add close button/gesture to dismiss modal in apps/mobile/app/components/AchievementDetail.tsx
- [x] T029 [P] [US2] Add accessibility support for modal (screen reader, keyboard nav) in apps/mobile/app/components/AchievementDetail.tsx
- [x] T030 [US2] Test tapping locked achievement → verify shows progress
- [x] T031 [US2] Test tapping unlocked achievement → verify shows earned date
- [x] T032 [US2] Test modal dismiss behavior

**Checkpoint**: User Story 2 complete - users can discover what achievements are available and track progress

---

## Phase 5: User Story 3 - Achievement Unlock Celebration (Priority: P3)

**Goal**: When users unlock a new achievement, show a brief celebratory animation/notification to make the moment feel special

**Independent Test**: Complete first session, reach 7-day streak, and verify celebration appears immediately after each milestone

### Implementation for User Story 3

- [x] T033 [P] [US3] Create AchievementCelebration component in apps/mobile/app/components/AchievementCelebration.tsx
- [x] T034 [US3] Update checkAndUnlockAchievements() to return newly unlocked achievements in apps/mobile/app/services/achievements.ts
- [x] T035 [US3] Add celebration trigger after session in apps/mobile/app/summary.tsx
- [x] T036 [US3] Design celebration animation (fade in, scale, emoji bounce) in apps/mobile/app/components/AchievementCelebration.tsx
- [x] T037 [US3] Show achievement emoji and "Unlocked!" message in celebration in apps/mobile/app/components/AchievementCelebration.tsx
- [x] T038 [US3] Auto-dismiss celebration after 3 seconds or on tap in apps/mobile/app/components/AchievementCelebration.tsx
- [x] T039 [P] [US3] Handle multiple simultaneous unlocks (show in sequence) in apps/mobile/app/components/AchievementCelebration.tsx
- [x] T040 [US3] Test celebration on first session complete → verify shows "🧘 First Step Unlocked!"
- [x] T041 [US3] Test celebration on 7-day streak → verify shows "🔥 Weekly Warrior Unlocked!"
- [x] T042 [US3] Test celebration timing (appears within 500ms)

**Checkpoint**: User Story 3 complete - achievement unlocks feel rewarding and special

---

## Phase 6: User Story 4 - Lesson Completion Achievements (Priority: P2)

**Goal**: Users who read educational lessons see their learning progress reflected in achievements

**Independent Test**: Complete all meditation basics lessons and verify "Student of Stillness" achievement unlocks

### Implementation for User Story 4

- [x] T043 [P] [US4] Add lesson completion tracking in apps/mobile/app/services/achievements.ts
- [x] T044 [US4] Add achievement check after lesson complete in apps/mobile/app/lessons/[id].tsx
- [x] T045 [US4] Implement "all_basics" lesson completion detection in apps/mobile/app/services/achievements.ts
- [x] T046 [US4] Update getAchievementProgress() to support lesson type in apps/mobile/app/services/achievements.ts
- [x] T047 [US4] Test completing individual lessons → verify progress updates
- [x] T048 [US4] Test completing all basic lessons → verify "Student of Stillness" unlocks
- [x] T049 [US4] Test lesson achievement persists across app restarts

**Checkpoint**: User Story 4 complete - lesson completion is gamified with achievements

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [x] T050 [P] Add debug buttons for achievement testing to DebugPanel in apps/mobile/app/components/DebugPanel.tsx
- [x] T051 [P] Verify all achievements render correctly on iOS (test emoji rendering)
- [x] T052 [P] Verify all achievements render correctly on Android (test emoji rendering)
- [x] T053 Test achievement grid layout on different screen sizes (4" to 7" screens)
- [x] T054 Test with VoiceOver enabled on iOS → verify all achievements are announced correctly
- [x] T055 Test with TalkBack enabled on Android → verify accessibility
- [x] T056 [P] Verify achievement data clears correctly when user clears app data
- [x] T057 Test rapid session completion → verify no duplicate unlocks
- [x] T058 Test app performance with all achievements unlocked
- [x] T059 [P] Code review and cleanup of achievement service
- [x] T060 [P] Update quickstart.md with any implementation learnings
- [x] T061 Validate all acceptance scenarios from spec.md are passing

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (US1 → US2/US4 → US3)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories ✅ MVP
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Extends US1 but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Enhances US1 but independently testable  
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Independent achievement type, no US1 dependency

### Within Each User Story

- Components before integrations
- Styling before testing
- Core functionality before edge cases
- Story complete before moving to next priority

### Parallel Opportunities

- T001 and T002 (Setup) can run in parallel
- T008 and T009 (Foundational helpers) can run in parallel after T003-T007
- T010 and T011 (US1 components) can run in parallel
- T014-T016 (US1 styling and accessibility) can run in parallel after components
- T021-T029 (US2 components and features) can run in parallel within dependencies
- T033-T039 (US3 celebration features) can run in parallel within dependencies
- T043-T046 (US4 lesson tracking) can run in parallel
- Most polish tasks (T050-T061) can run in parallel

---

## Parallel Example: User Story 1

```bash
# Setup phase (parallel):
Task T001: "Create TypeScript interfaces"
Task T002: "Add storage key constant"

# Foundational phase (sequential core, parallel helpers):
Task T003-T007: "Core achievement service" (sequential)
Task T008: "isAchievementUnlocked helper" (parallel after core)
Task T009: "resetAchievements helper" (parallel after core)

# User Story 1 components (parallel):
Task T010: "Create AchievementItem component"
Task T011: "Create AchievementGrid component"

# User Story 1 styling (parallel):
Task T014: "Style locked achievements"
Task T015: "Style unlocked achievements"  
Task T016: "Add accessibility labels"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Foundational (T003-T009) - CRITICAL
3. Complete Phase 3: User Story 1 (T010-T020)
4. **STOP and VALIDATE**: Test User Story 1 independently with DebugPanel
5. Deploy/demo achievement display feature

**MVP Deliverable**: Users can see their meditation achievements on the activity page with locked/unlocked visual states

### Incremental Delivery

1. Complete Setup + Foundational (T001-T009) → Achievement service ready
2. Add User Story 1 (T010-T020) → Test independently → Deploy/Demo (MVP! ✅)
3. Add User Story 2 (T021-T032) → Test independently → Deploy/Demo (achievement details)
4. Add User Story 4 (T043-T049) → Test independently → Deploy/Demo (lesson achievements)
5. Add User Story 3 (T033-T042) → Test independently → Deploy/Demo (celebrations)
6. Polish (T050-T061) → Final validation → Production release

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T009)
2. Once Foundational is done:
   - Developer A: User Story 1 (T010-T020) - MVP priority
   - Developer B: User Story 2 (T021-T032) - Can start in parallel
   - Developer C: User Story 4 (T043-T049) - Independent feature
3. User Story 3 can be added by any developer after US1 is complete
4. Polish tasks distributed across team

---

## Testing with DebugPanel

All user stories should be tested using the existing DebugPanel:

```typescript
// Test scenarios via DebugPanel buttons:
- 🆕 New User (0 sessions) → All achievements locked
- 1️⃣ First Day (1 session) → "First Step" unlocked
- 🔥 Week Streak (7 days) → "Weekly Warrior" unlocked  
- 🌟 Month Streak (30 days) → "Mindful Month" unlocked
- 💪 Committed (30 sessions) → "Committed" unlocked
- 🎯 Dedicated (100 sessions) → "Dedicated" unlocked
```

Add achievement-specific debug buttons in T050.

---

## Notes

- [P] tasks = different files, no dependencies within their phase
- [Story] label maps task to specific user story for traceability (US1, US2, US3, US4)
- Each user story should be independently completable and testable
- Use DebugPanel for all testing (no automated tests in MVP)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Emoji rendering is native - test on both iOS and Android
- Achievement data stored at `@monk_mode:achievements` in AsyncStorage
- All data stays local - fully offline-capable
- No new dependencies required

---

## Task Count Summary

- **Phase 1 (Setup)**: 2 tasks
- **Phase 2 (Foundational)**: 7 tasks  
- **Phase 3 (US1 - MVP)**: 11 tasks
- **Phase 4 (US2)**: 12 tasks
- **Phase 5 (US3)**: 10 tasks
- **Phase 6 (US4)**: 7 tasks
- **Phase 7 (Polish)**: 12 tasks

**Total**: 61 tasks

**MVP Scope** (Recommended first delivery): Phase 1 + Phase 2 + Phase 3 = 20 tasks

**Parallel Opportunities**: ~25 tasks marked [P] can run in parallel within their phases

**Independent User Stories**: All 4 user stories are independently testable after Foundational phase
