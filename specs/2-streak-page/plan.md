# Implementation Plan: Streak Display Page (Activity Page)

ID: 2-streak-page
Spec: ./spec.md
Constitution: ../../.specify/memory/constitution.md

## Technical Context
- **Platform**: Mobile (iOS, Android) via Expo managed workflow (SDK 54+)
- **Framework**: React Native with Expo Router (file-based routing)
- **Existing Services**: Leverages `services/streaks.ts` from feature 1-meditation-timer-streaks
- **Storage**: Reads from @react-native-async-storage/async-storage via existing streaks service
- **Navigation**: Expo Router file-based routing; new route at `/activity.tsx`
- **Safe Areas**: react-native-safe-area-context for Dynamic Island/notch handling
- **Design**: Minimalistic light color scheme (#FAFAFA background, #1A1A1A primary) - consistent with existing app
- **State**: React hooks (useState, useEffect) to fetch and display streak data
- **Performance**: Page load target <500ms; data fetch is local (AsyncStorage)

## Constitution Check
- ✅ Mobile-First, Offline-Ready: New screen in existing Expo app; reads local AsyncStorage data
- ✅ Accessibility & Simplicity: Large touch targets for navigation, clear hierarchy, SafeAreaView for all devices
- ✅ Test-First MVP Scope: Manual testing against acceptance criteria; no new backend logic (reuses existing service)
- ✅ Performance & Reliability: Local data fetch from AsyncStorage; sub-500ms load time easily achievable
- ✅ Privacy by Default: No new data collection; displays existing on-device streak data only

**Gate: PASS** (no violations)

## Current Status (Phase 0 Complete)

Research findings:
- **Existing Streaks Service**: Feature 1 provides `getCurrentStreaks()` which returns:
  - `currentStreak`: number of consecutive days
  - `longestStreak`: all-time maximum streak
  - `totalDays`: lifetime session count
  - `lastCreditedDate`: last meditation date (YYYY-MM-DD format)
- **Navigation Pattern**: App uses Expo Router file-based routing; new routes added as `/app/[route].tsx`
- **Design System**: Existing screens use:
  - SafeAreaView for top edge (Dynamic Island/notch)
  - Bottom actions with 24pt padding (home indicator clearance)
  - #FAFAFA background, #1A1A1A text, #FFFFFF cards
  - Rounded buttons (borderRadius 24), shadows for depth
- **Timezone Handling**: Existing service uses device local time; consistent with spec requirements

## Phase 1: Design & Architecture

### Data Model

**Streak Data** (existing entity from feature 1):
- `currentStreak: number` - Consecutive days of meditation
- `longestStreak: number` - All-time maximum streak
- `totalDays: number` - Lifetime count of unique meditation days
- `lastCreditedDate: string` - Last meditation date (YYYY-MM-DD)

**UI State**:
- Loading state (initial fetch)
- Display state (showing streak data)
- Error state (if AsyncStorage read fails)

### Component Structure

```
/app/activity.tsx
├─ SafeAreaView (wrapper)
├─ ScrollView (content area)
│  ├─ Title: "My Activity"
│  ├─ Stats Cards Container
│  │  ├─ Current Streak Card (primary, larger)
│  │  ├─ Longest Streak Card (secondary)
│  │  └─ Total Sessions Card (tertiary)
│  └─ Empty State (if totalDays === 0)
└─ Bottom Actions (back button)
```

### Navigation Updates

**Home Screen** (`/app/index.tsx`):
- Add "Activity" navigation button/link

**Summary Screen** (`/app/summary.tsx`):
- Add "My Activity" button after session completion

**Activity Screen** (`/app/activity.tsx`):
- Provide back button to return to previous screen

### Visual Hierarchy

1. **Primary Focus**: Current Streak
   - Largest card/section
   - Prominent number display
   - Clear "days" label
   
2. **Secondary**: Longest Streak
   - Medium card
   - Shows personal best
   - Motivational context

3. **Tertiary**: Total Sessions
   - Smaller card or text display
   - Lifetime count

4. **Empty State** (0 sessions):
   - Encouraging message
   - Prompt to start first meditation

## Phase 2: Implementation Tasks

### Task 1: Create Activity Page Component
**File**: `/apps/mobile/app/activity.tsx`
**Dependencies**: None
**Deliverable**: New screen component with:
- SafeAreaView wrapper with `edges={['top']}`
- useEffect to fetch streak data on mount
- Loading, display, and empty states
- Styled cards showing current streak, longest streak, total sessions
- Back button in bottom actions (24pt bottom padding)

### Task 2: Add Navigation from Home Screen
**File**: `/apps/mobile/app/index.tsx`
**Dependencies**: Task 1
**Deliverable**: 
- Add "Activity" navigation button/link
- Uses `router.push('/activity')`
- Consistent styling with existing navigation elements

### Task 3: Add Navigation from Summary Screen
**File**: `/apps/mobile/app/summary.tsx`
**Dependencies**: Task 1
**Deliverable**:
- Add "My Activity" button after session stats
- Navigates to `/activity` via `router.push('/activity')`
- Clear, tappable button with proper styling

### Task 4: Style and Polish
**Files**: All activity-related components
**Dependencies**: Tasks 1-3
**Deliverable**:
- Consistent with existing minimalistic design
- Large touch targets (min 44pt)
- Smooth transitions and loading states
- Visual distinction between current/longest/total
- Proper spacing and alignment
- Responsive to different screen sizes

## Phase 3: Testing & Validation

### Manual Test Scenarios

1. **US1: View Current Streak**
   - Complete sessions on 5 consecutive days
   - Navigate to activity page
   - Verify current streak shows "5 days"

2. **US2: View Longest Streak**
   - Establish 10-day streak, break it
   - Complete 3 new sessions
   - Verify activity page shows "Current: 3 days, Longest: 10 days"

3. **US3: Navigation from Home**
   - Launch app to home screen
   - Tap "Activity" button
   - Verify navigation to activity page
   - Tap back button
   - Verify return to home

4. **US3: Navigation from Summary**
   - Complete a meditation session
   - On summary screen, tap "My Activity"
   - Verify navigation to activity page

5. **US4: Total Sessions**
   - Complete 25 total sessions (across multiple days with breaks)
   - Navigate to activity page
   - Verify "Total Sessions: 25"

6. **Empty State**
   - Reset app data or test with new install
   - Navigate to activity page
   - Verify empty state shows "0 days" or encouraging message

### Success Criteria Validation

- **SC-001**: ✓ Activity page accessible in 1 tap from home screen
- **SC-002**: ✓ Page loads <500ms (local AsyncStorage read)
- **SC-003**: ✓ Visual hierarchy makes current/longest/total distinguishable
- **SC-004**: ✓ Uses `getCurrentStreaks()` - guaranteed 100% accuracy
- **SC-005**: ✓ SafeAreaView, 44pt touch targets, consistent typography

## Phase 4: Edge Cases Handling

1. **Midnight Crossing**: Display reflects device time; streak breaks immediately if no meditation today (per spec clarification)
2. **Timezone Changes**: Uses device local time; consistent with existing streak service behavior
3. **Multiple Sessions Same Day**: Shows 1 day credit (existing service handles this)
4. **365+ Day Streaks**: UI accommodates large numbers; achievement noted in spec (future iteration)
5. **New User (0 sessions)**: Shows empty state with 0 days
6. **Rapid Navigation**: React component lifecycle handles quick back/forth smoothly

## Implementation Strategy

### Execution Order
1. Phase 1: Design (complete above) ✓
2. Phase 2: Implementation
   - Task 1: Create activity.tsx component
   - Task 2: Add home navigation
   - Task 3: Add summary navigation
   - Task 4: Style polish
3. Phase 3: Manual testing against acceptance criteria
4. Phase 4: Edge case verification

### Key Files to Create/Modify
**New Files**:
- `/apps/mobile/app/activity.tsx` - Main activity/streak page component

**Modified Files**:
- `/apps/mobile/app/index.tsx` - Add activity navigation
- `/apps/mobile/app/summary.tsx` - Add "My Activity" button

### Dependencies
- Feature 1 (meditation-timer-streaks) must be complete - ✓ Already implemented
- Streaks service (`services/streaks.ts`) - ✓ Available
- SafeAreaView from react-native-safe-area-context - ✓ Already installed
- Expo Router - ✓ Already configured

### Risks & Mitigations
- **Risk**: Inconsistent styling with existing screens
  - **Mitigation**: Reference existing pages (lessons, preset, player) for style patterns
- **Risk**: Performance degradation on older devices
  - **Mitigation**: Local data only, no computation; React optimization patterns
- **Risk**: Navigation conflicts with existing routes
  - **Mitigation**: Use unique `/activity` route; test all navigation paths

## Next Actions
1. Create `/apps/mobile/app/activity.tsx` component
2. Implement data fetching with `getCurrentStreaks()`
3. Design and style the three stat cards (current, longest, total)
4. Add navigation buttons on home and summary screens
5. Manual test all acceptance scenarios
6. Verify constitution compliance (accessibility, performance, design)

---

**Plan Status**: Ready for implementation
**Estimated Effort**: 2-4 hours (UI-only feature, reusing existing services)
**Success Metrics**: All acceptance scenarios pass; <500ms load; consistent design
