# Tasks: Meditation Content Restructure

**Input**: Design documents from `/specs/005-meditation-content-restructure/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: No automated tests required - manual verification per constitution (content-only update)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Mobile app**: `apps/mobile/app/` at repository root
- All paths are absolute from repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify existing project structure and prepare for content updates

- [x] T001 Verify current branch is `005-meditation-content-restructure`
- [x] T002 Review source material in `apps/mobile/app/lessons/content.md` to understand Anapanasati methodology
- [x] T003 [P] Backup existing exercises data from `apps/mobile/app/data/exercises.ts`
- [x] T004 [P] Backup existing presets data from `apps/mobile/app/data/presets.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Update TypeScript interfaces that all user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Add `MeditationStage` interface to `apps/mobile/app/data/exercises.ts` with fields: name, durationRange, technique, order
- [x] T006 Extend `Exercise` interface in `apps/mobile/app/data/exercises.ts` with optional fields: stages?, blockLevel?, description?
- [x] T007 Verify TypeScript compilation succeeds after interface changes

**Checkpoint**: Type definitions ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Structured Meditation Exercises with Stage Guidance (Priority: P1) 🎯 MVP

**Goal**: Replace generic exercises with three Anapanasati exercises, each with detailed stage-by-stage breakdowns

**Independent Test**: Select any meditation preset and verify it displays clear stage-by-stage instructions with timing and technique descriptions. Verify timer runs for correct duration.

### Implementation for User Story 1

- [x] T008 [P] [US1] Create Anapanasati Basic exercise (15-min, 2 stages) in `apps/mobile/app/data/exercises.ts`
  - Stage 1: Entering Meditation (1-2 min)
  - Stage 2: Establishing Clear Comprehension (13-14 min)
- [x] T009 [P] [US1] Create Anapanasati Intermediate exercise (30-min, 3 stages) in `apps/mobile/app/data/exercises.ts`
  - Stage 1: Entering and Establishing Clear Comprehension (~15 min)
  - Stage 2: Establishing Mindfulness in Front of Oneself (~5 min)
  - Stage 3: Observing the Mind / Working with Reactions (5-10 min)
- [x] T010 [P] [US1] Create Anapanasati Advanced exercise (60-min, 5 stages) in `apps/mobile/app/data/exercises.ts`
  - Stage 1: Entering and Establishing Clear Comprehension (~15 min)
  - Stage 2: Establishing Mindfulness in Front of Oneself (~5 min)
  - Stage 3: Observing the Mind (5-10 min)
  - Stage 4: Establishing Equanimity (~10 min)
  - Stage 5: Establishing Concentration (15-20 min)
- [x] T011 [US1] Replace exercises array in `apps/mobile/app/data/exercises.ts` with three new Anapanasati exercises (remove old 12 exercises)
- [x] T012 [US1] Verify exercise durations match: Basic=900s (15min), Intermediate=1800s (30min), Advanced=3600s (60min)
- [x] T013 [US1] Manual test: Select Beginner preset, verify 2 stages display with correct timing and techniques
- [x] T014 [US1] Manual test: Select Experienced preset, verify 3 stages display with correct timing and techniques
- [x] T015 [US1] Manual test: Select Advanced preset, verify 5 stages display with correct timing and techniques
- [x] T016 [US1] Manual test: Start and complete 15-min meditation, verify timer accuracy and streak increments

**Checkpoint**: At this point, User Story 1 should be fully functional - users can see structured meditation exercises with stage guidance

---

## Phase 4: User Story 2 - Updated Meditation Lessons with Anapanasati Content (Priority: P2)

**Goal**: Update lesson content to cover Anapanasati methodology including philosophy, posture, techniques, obstacles, and glossary

**Independent Test**: Browse lessons section and verify content covers Anapanasati topics (posture, mudras, 5 stages, overcoming obstacles, glossary). Verify lessons are readable and complete.

### Implementation for User Story 2

- [x] T017 [P] [US2] Create/update lesson: "What is Anapanasati?" covering course philosophy and goals in `apps/mobile/app/data/lessons/`
- [x] T018 [P] [US2] Create/update lesson: "Posture and Physical Setup" covering sitting positions (chair, Burmese, Siddhasana), spine alignment in `apps/mobile/app/data/lessons/`
- [x] T019 [P] [US2] Create/update lesson: "Hand Mudras" covering Dhyana and Bhumisparsa mudras in `apps/mobile/app/data/lessons/`
- [x] T020 [P] [US2] Create/update lesson: "Stage 1 - Entering Meditation" covering posture assumption and sense scanning in `apps/mobile/app/data/lessons/`
- [x] T021 [P] [US2] Create/update lesson: "Stage 2 - Establishing Clear Comprehension" covering breath counting and mental labels in `apps/mobile/app/data/lessons/`
- [x] T022 [P] [US2] Create/update lesson: "Stage 3 - Establishing Mindfulness" covering continuous flow observation and "new, new, new" technique in `apps/mobile/app/data/lessons/`
- [x] T023 [P] [US2] Create/update lesson: "Stage 4 - Observing the Mind" covering Big Mind vs small mind, investigation techniques in `apps/mobile/app/data/lessons/`
- [x] T024 [P] [US2] Create/update lesson: "Stage 5 - Establishing Equanimity" covering "brake pedal" concept and letting go of craving in `apps/mobile/app/data/lessons/`
- [x] T025 [P] [US2] Create/update lesson: "Stage 6 - Establishing Concentration" covering "gas pedal" concept and full breath tracking in `apps/mobile/app/data/lessons/`
- [x] T026 [P] [US2] Create/update lesson: "Overcoming Agitation" covering renewal of resolve and phase-based commitment in `apps/mobile/app/data/lessons/`
- [x] T027 [P] [US2] Create/update lesson: "Overcoming Lethargy" covering physical and breath stimulation techniques in `apps/mobile/app/data/lessons/`
- [x] T028 [P] [US2] Create/update lesson: "Glossary of Terms" defining Anapanasati, Big Mind, Equanimity, Sati, Non-Attachment, Reaction, Small Mind in `apps/mobile/app/data/lessons/`
- [x] T029 [US2] Verify all lessons are properly linked/indexed in lesson data structure
- [x] T030 [US2] Manual test: Browse lessons, verify posture lesson displays with sitting positions and mudra details
- [x] T031 [US2] Manual test: Read Stage 2 lesson, verify it explains breath counting and mental labels clearly
- [x] T032 [US2] Manual test: Find "Overcoming Agitation" lesson, verify it contains specific techniques
- [x] T033 [US2] Manual test: Access glossary, verify all 7+ key terms are defined in plain language

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - users have structured exercises AND educational content

---

## Phase 5: User Story 3 - Preset Descriptions Aligned with Meditation Blocks (Priority: P3)

**Goal**: Update preset descriptions to clearly explain meditation block structure and experience levels

**Independent Test**: View preset selection screen and verify descriptions match the new block structure (15-min = Basic/Express, 30-min = Intermediate/Confident, 60-min = Advanced/Deep Dive)

### Implementation for User Story 3

- [x] T034 [P] [US3] Update Beginner preset description to "15-Minute Block (Basic Level or Express Practice)" in `apps/mobile/app/data/presets.ts`
- [x] T035 [P] [US3] Update Beginner preset exerciseIds to ["anapanasati-basic"] in `apps/mobile/app/data/presets.ts`
- [x] T036 [P] [US3] Update Experienced preset description to "30-Minute Block (Confident Practice / Intermediate Level)" in `apps/mobile/app/data/presets.ts`
- [x] T037 [P] [US3] Update Experienced preset exerciseIds to ["anapanasati-intermediate"] in `apps/mobile/app/data/presets.ts`
- [x] T038 [P] [US3] Update Advanced preset description to "60-Minute Block (Deep Dive / Advanced Level)" in `apps/mobile/app/data/presets.ts`
- [x] T039 [P] [US3] Update Advanced preset exerciseIds to ["anapanasati-advanced"] in `apps/mobile/app/data/presets.ts`
- [x] T040 [US3] Verify preset totalDurationMin values remain unchanged (15, 30, 60)
- [x] T041 [US3] Manual test: View Beginner preset, verify description shows "15-Minute Block (Basic Level or Express Practice)"
- [x] T042 [US3] Manual test: View Experienced preset, verify description shows "30-Minute Block (Confident Practice / Intermediate Level)"
- [x] T043 [US3] Manual test: View Advanced preset, verify description shows "60-Minute Block (Deep Dive / Advanced Level)"

**Checkpoint**: All user stories should now be independently functional - structured exercises, educational lessons, and clear preset descriptions

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and documentation

- [x] T044 [P] Build iOS app and verify no compilation errors
- [x] T045 [P] Build Android app and verify no compilation errors
- [x] T046 Manual test: Complete full 15-min meditation session on iOS, verify streak increments
- [x] T047 Manual test: Complete full 30-min meditation session on Android, verify timer accuracy
- [x] T048 Manual test: Browse all lessons on both platforms, verify content displays correctly
- [x] T049 Verify all acceptance criteria from spec.md are met (US1: stages display, US2: lessons complete, US3: descriptions updated)
- [x] T050 Run through quickstart.md testing checklist to validate all scenarios
- [x] T051 Update CHANGELOG or release notes documenting content restructure
- [x] T052 Commit all changes with message: "feat(content): restructure meditation exercises and lessons with Anapanasati methodology"

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1 (lessons work without exercises)
- **User Story 3 (P3)**: Can start after US1 completion (needs exercise IDs) - Can run parallel with US2

### Within Each User Story

- **US1**: Exercise creation tasks (T008-T010) can run in parallel, then replace array (T011), then manual tests
- **US2**: All lesson creation tasks (T017-T028) can run in parallel, then verify linking (T029), then manual tests
- **US3**: All preset update tasks (T034-T039) can run in parallel, then verify durations (T040), then manual tests

### Parallel Opportunities

- **Phase 1**: T003 and T004 (backups) can run in parallel
- **Phase 2**: All tasks must run sequentially (interface changes)
- **Phase 3 (US1)**: T008, T009, T010 (exercise creation) can run in parallel
- **Phase 4 (US2)**: T017-T028 (all lesson creation) can run in parallel - 12 tasks simultaneously
- **Phase 5 (US3)**: T034-T039 (all preset updates) can run in parallel - 6 tasks simultaneously
- **Phase 6**: T044 and T045 (iOS/Android builds) can run in parallel
- **Cross-story**: US2 and US3 can run in parallel after US1 completes

---

## Parallel Example: User Story 2 (Lesson Creation)

```bash
# Launch all lesson creation tasks together (12 parallel tasks):
Task T017: "Create/update lesson: What is Anapanasati?"
Task T018: "Create/update lesson: Posture and Physical Setup"
Task T019: "Create/update lesson: Hand Mudras"
Task T020: "Create/update lesson: Stage 1 - Entering Meditation"
Task T021: "Create/update lesson: Stage 2 - Establishing Clear Comprehension"
Task T022: "Create/update lesson: Stage 3 - Establishing Mindfulness"
Task T023: "Create/update lesson: Stage 4 - Observing the Mind"
Task T024: "Create/update lesson: Stage 5 - Establishing Equanimity"
Task T025: "Create/update lesson: Stage 6 - Establishing Concentration"
Task T026: "Create/update lesson: Overcoming Agitation"
Task T027: "Create/update lesson: Overcoming Lethargy"
Task T028: "Create/update lesson: Glossary of Terms"

# All can be created simultaneously since they're different files
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T007) - CRITICAL
3. Complete Phase 3: User Story 1 (T008-T016)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Users can now meditate with structured stage guidance ✅

### Incremental Delivery

1. Complete Setup + Foundational → Type definitions ready
2. Add User Story 1 → Test independently → Users have structured exercises (MVP!)
3. Add User Story 2 → Test independently → Users have educational content
4. Add User Story 3 → Test independently → Users have clear preset descriptions
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T007)
2. Once Foundational is done:
   - Developer A: User Story 1 (T008-T016) - exercises
   - Developer B: User Story 2 (T017-T033) - lessons
   - Developer C: User Story 3 (T034-T043) - presets (waits for US1 exercise IDs)
3. Stories complete and integrate independently

### Single Developer Strategy

1. Complete Setup + Foundational (T001-T007)
2. Complete US1 exercises (T008-T016) - delivers MVP
3. Complete US2 lessons (T017-T033) - adds education
4. Complete US3 presets (T034-T043) - adds polish
5. Complete Polish phase (T044-T052) - final validation

---

## Task Summary

**Total Tasks**: 52 tasks across 6 phases

**Task Count by Phase**:
- Phase 1 (Setup): 4 tasks
- Phase 2 (Foundational): 3 tasks ⚠️ BLOCKING
- Phase 3 (US1 - Exercises): 9 tasks 🎯 MVP
- Phase 4 (US2 - Lessons): 17 tasks
- Phase 5 (US3 - Presets): 10 tasks
- Phase 6 (Polish): 9 tasks

**Parallel Opportunities**:
- Phase 1: 2 tasks can run in parallel (T003, T004)
- Phase 3: 3 tasks can run in parallel (T008, T009, T010)
- Phase 4: 12 tasks can run in parallel (T017-T028)
- Phase 5: 6 tasks can run in parallel (T034-T039)
- Phase 6: 2 tasks can run in parallel (T044, T045)
- **Total parallelizable tasks**: 25 out of 52 (48%)

**Independent Test Criteria**:
- **US1**: Select any preset → see stage-by-stage instructions → timer runs correctly
- **US2**: Browse lessons → see Anapanasati content → all topics covered
- **US3**: View presets → see block descriptions → clear experience levels

**Suggested MVP Scope**: Phase 1 + Phase 2 + Phase 3 (User Story 1 only) = 16 tasks

**Estimated Implementation Time**:
- MVP (US1 only): 2-3 hours
- Full feature (US1+US2+US3): 4-6 hours
- With parallel execution: 3-4 hours

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- No automated tests required - manual verification per constitution
- Commit after each phase or logical group
- Stop at any checkpoint to validate story independently
- All file paths are absolute from repository root
- Content-only update - no UI component changes needed
