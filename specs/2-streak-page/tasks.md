# Tasks: Streak Display Page (Activity Page)

**Input**: Design documents from `/specs/2-streak-page/`
**Prerequisites**: plan.md, spec.md, data-model.md, quickstart.md

**Tests**: Manual testing only (no automated tests requested in specification)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Mobile app**: `/apps/mobile/app/` (Expo Router structure)
- **Services**: `/apps/mobile/app/services/` (existing)
- All paths are absolute from repository root

---

## Phase 1: Foundational - Page Structure & Navigation (US3)

**Purpose**: Create activity page component and add navigation access points

**Goal**: Users can navigate to the activity page from home screen and summary screen (User Story 3 - P1)

**Independent Test**: Launch app, tap "Activity" button from home screen, verify navigation to activity page, tap back button, verify return to home screen

- [x] T001 [US3] Create activity page component at /apps/mobile/app/activity.tsx with SafeAreaView wrapper, basic layout structure, and back button
- [x] T002 [US3] Add "Activity" navigation button to home screen in /apps/mobile/app/index.tsx with router.push('/activity')
- [x] T003 [US3] Add "My Activity" navigation button to summary screen in /apps/mobile/app/summary.tsx after session stats

**Checkpoint**: Activity page accessible from home and summary screens; back navigation works

---

## Phase 2: User Story 1 - View Current Streak (Priority: P1) 🎯 MVP

**Goal**: Display current meditation streak in days to show users their consistency

**Independent Test**: Complete meditation sessions on 5 consecutive days, navigate to activity page, verify current streak displays "5 days"

### Implementation for User Story 1

- [x] T004 [US1] Import getCurrentStreaks from services/streaks.ts in /apps/mobile/app/activity.tsx
- [x] T005 [US1] Add useState hook for streak data and loading state in /apps/mobile/app/activity.tsx
- [x] T006 [US1] Add useEffect to fetch streak data on component mount in /apps/mobile/app/activity.tsx
- [x] T007 [US1] Create primary stats card component for current streak display in /apps/mobile/app/activity.tsx
- [x] T008 [US1] Style current streak card with large number, "days" label, and prominent visual hierarchy in /apps/mobile/app/activity.tsx
- [x] T009 [US1] Add loading state UI (spinner or skeleton) in /apps/mobile/app/activity.tsx
- [x] T010 [US1] Handle singular/plural text ("1 day" vs "X days") in current streak display

**Checkpoint**: Current streak displays correctly; loads data from existing streaks service; handles loading state

---

## Phase 3: User Story 2 - View Longest Streak (Priority: P2)

**Goal**: Display all-time longest streak to motivate users and celebrate achievements

**Independent Test**: Establish 10-day streak, break it, complete 3 new sessions, verify activity page shows "Current: 3 days, Longest: 10 days"

### Implementation for User Story 2

- [x] T011 [US2] Create secondary stats card component for longest streak in /apps/mobile/app/activity.tsx
- [x] T012 [US2] Display longestStreak value from streak data in longest streak card
- [x] T013 [US2] Style longest streak card as secondary to current streak (smaller, different visual weight) in /apps/mobile/app/activity.tsx
- [x] T014 [US2] Add "Best:" or "Personal Record:" label to longest streak card

**Checkpoint**: Both current and longest streaks display correctly; visual hierarchy distinguishes primary (current) from secondary (longest)

---

## Phase 4: User Story 4 - View Total Sessions (Priority: P3)

**Goal**: Display lifetime count of meditation sessions for overall commitment tracking

**Independent Test**: Complete 25 total sessions (across multiple days with breaks), verify activity page shows "Total Sessions: 25"

### Implementation for User Story 4

- [x] T015 [US4] Create tertiary stats card or text component for total sessions in /apps/mobile/app/activity.tsx
- [x] T016 [US4] Display totalDays value from streak data as total sessions count
- [x] T017 [US4] Style total sessions display as tertiary element (smallest visual weight) in /apps/mobile/app/activity.tsx
- [x] T018 [US4] Add "Total:" or "Lifetime:" label to total sessions display

**Checkpoint**: All three stats (current, longest, total) display correctly with clear visual hierarchy

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Empty states, edge cases, styling consistency, and final validation

- [x] T019 [P] Add empty state UI for new users (totalDays === 0) with encouraging message in /apps/mobile/app/activity.tsx
- [x] T020 [P] Add error handling for AsyncStorage read failures in /apps/mobile/app/activity.tsx
- [x] T021 [P] Verify SafeAreaView bottom padding (24pt) for home indicator clearance in /apps/mobile/app/activity.tsx
- [ ] T022 [P] Add page title "My Activity" or "Meditation Stats" at top of page in /apps/mobile/app/activity.tsx
- [x] T023 Verify consistent styling with existing app (colors: #FAFAFA background, #1A1A1A text, #FFFFFF cards) in /apps/mobile/app/activity.tsx
- [ ] T024 [P] Add card shadows and rounded corners (borderRadius: 12-24) for depth in /apps/mobile/app/activity.tsx
- [x] T025 Verify back button styling matches other screens (rounded, 44pt min height, proper hitSlop) in /apps/mobile/app/activity.tsx
- [ ] T026 Test rapid navigation (quick back/forth between pages) for smooth transitions
- [ ] T027 Verify page load performance (<500ms from navigation tap to data display)
- [ ] T028 Test on iOS device with Dynamic Island (verify SafeAreaView top padding)
- [ ] T029 Test on older iPhone without notch (verify no excessive top padding)
- [ ] T030 Test empty state with new user (0 sessions)
- [ ] T031 Test all edge cases: streak broken (current < longest), new personal record (current === longest), very long streaks (100+ days)
- [ ] T032 Run all acceptance scenarios from spec.md (US1-1, US1-2, US1-3, US2-1, US2-2, US2-3, US3-1, US3-2, US3-3, US4-1, US4-2, US4-3)
- [ ] T033 Update constitution compliance checklist: verify accessibility (VoiceOver labels, contrast), performance (<500ms), privacy (local data only)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: No dependencies - can start immediately (existing app structure and services already in place)
- **User Story 1 (Phase 2)**: Depends on Foundational completion - needs activity page and navigation to exist
- **User Story 2 (Phase 3)**: Depends on US1 completion - adds to existing layout
- **User Story 4 (Phase 4)**: Depends on US1 completion - adds to existing layout (US2 not required)
- **Polish (Phase 5)**: Depends on desired user stories being complete (minimum US1 for MVP)

### User Story Dependencies

- **User Story 3 (Foundational)**: Independent - creates page and navigation
- **User Story 1 (P1)**: Depends only on Foundational - displays current streak
- **User Story 2 (P2)**: Depends on US1 (shares same page layout)
- **User Story 4 (P3)**: Depends on US1 (shares same page layout)

**Note**: US2 and US4 can be implemented in parallel after US1 if desired (both add non-conflicting display elements)

### Within Each Phase

- Foundational: Navigation tasks (T002, T003) can run in parallel after T001 (page component) completes
- User Story 1: T004-T006 (setup) before T007-T010 (UI components)
- User Story 2: All tasks sequential (adding to existing layout)
- User Story 4: All tasks sequential (adding to existing layout)
- Polish: Most tasks marked [P] can run in parallel (different concerns)

### Parallel Opportunities

- **After T001**: T002 and T003 can run in parallel (different files)
- **Polish Phase**: T019, T020, T021, T022, T024 can run in parallel (independent concerns)
- **Testing**: T026-T031 can be distributed across team members

---

## Parallel Example: Foundational Phase

```bash
# After creating activity page component (T001):
Task: "Add Activity navigation button to home screen in /apps/mobile/app/index.tsx"
Task: "Add My Activity navigation button to summary screen in /apps/mobile/app/summary.tsx"

# These modify different files and can run in parallel
```

---

## Parallel Example: Polish Phase

```bash
# These concerns are independent and can run in parallel:
Task: "Add empty state UI for new users in /apps/mobile/app/activity.tsx" (one dev)
Task: "Add error handling for AsyncStorage failures in /apps/mobile/app/activity.tsx" (same or different section)
Task: "Add page title at top in /apps/mobile/app/activity.tsx" (different section)
Task: "Test on iOS device with Dynamic Island" (QA/different dev)
```

---

## Implementation Strategy

### MVP First (User Story 3 + User Story 1 Only)

1. Complete Phase 1: Foundational (US3 - navigation and basic page structure)
2. Complete Phase 2: User Story 1 (current streak display - core value)
3. **STOP and VALIDATE**: Test US1 independently (complete sessions, check current streak)
4. Demo to stakeholders if ready

**MVP Delivers**: Users can navigate to activity page and see their current meditation streak

### Incremental Delivery (Recommended)

1. Complete Foundational → Page accessible, navigation works
2. Add User Story 1 → Current streak displays → Test independently → **Deploy/Demo (MVP!)**
3. Add User Story 2 → Longest streak displays → Test independently → Deploy/Demo
4. Add User Story 4 → Total sessions displays → Test independently → Deploy/Demo
5. Polish Phase → Empty states, edge cases, final styling → Final release

### Fast Track (All P1 Features)

If time permits, implement both P1 user stories together:

1. Complete Foundational (US3)
2. Complete US1 + US2 together (both are relatively simple display additions)
3. Validate both work
4. Add US4 if desired
5. Polish and release

---

## Execution Order Summary

**Linear Path** (safest for solo developer):
```
Foundational → US1 → US2 → US4 → Polish
```

**Parallel Path** (if team capacity):
```
Foundational → US1
            ↓
           US2 + US4 (in parallel after US1)
            ↓
          Polish
```

**MVP Path** (minimum viable):
```
Foundational → US1 → Polish (T019, T020, T023, T032, T033 only)
```

---

## Next Actions

1. Start with T001: Create activity.tsx component with basic structure
2. Complete Foundational phase (T001-T003) to enable navigation
3. Implement US1 (T004-T010) for core MVP functionality
4. Test current streak display against acceptance criteria
5. Proceed to US2 and US4 incrementally
6. Complete polish tasks for production readiness

---

## Notes

- [P] tasks = different files or independent concerns, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently testable
- No automated tests requested - manual testing against acceptance scenarios in spec.md
- All data comes from existing `/apps/mobile/app/services/streaks.ts` - no new service logic needed
- Page load target: <500ms (easily achievable with local AsyncStorage read)
- Design consistency: Match existing screens (preset.tsx, lessons/index.tsx, summary.tsx)
- Accessibility: SafeAreaView for Dynamic Island, 44pt touch targets, proper labels

---

**Total Tasks**: 33
- Foundational (US3): 3 tasks
- User Story 1 (P1): 7 tasks - **Core MVP**
- User Story 2 (P2): 4 tasks
- User Story 4 (P3): 4 tasks
- Polish & Validation: 15 tasks

**Estimated Effort**: 2-4 hours total (UI-only feature, no backend logic)

**MVP Scope**: Foundational + US1 = 10 tasks (~1-2 hours)
