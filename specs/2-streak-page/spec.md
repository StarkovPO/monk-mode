# Feature Specification: Streak Display Page

**Feature Branch**: `2-streak-page`  
**Created**: 2025-12-05  
**Status**: In Progress  
**Input**: User description: "I wanna add feature with meditation streak. We already count the streak, but user can't check it in any time. I want to build u streak page where would be the number of streak days"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Current Streak (Priority: P1)

As a meditation app user, I want to see my current meditation streak so that I can track my consistency and feel motivated to continue my practice.

**Why this priority**: This is the core value proposition of the feature - giving users visibility into their progress. Without this, the streak tracking happening in the background provides no user value.

**Independent Test**: Can be fully tested by completing a meditation session, navigating to the streak page, and verifying the current streak count is displayed correctly. Delivers immediate value by showing users their progress.

**Acceptance Scenarios**:

1. **Given** I have completed meditation sessions on 5 consecutive days, **When** I navigate to the streak page, **Then** I see my current streak displayed as "5 days"
2. **Given** I have not meditated today but have a 3-day streak, **When** I view the streak page, **Then** I see my current streak as "3 days" with an indicator that today's session is pending
3. **Given** I broke my streak yesterday (missed a day), **When** I check the streak page, **Then** I see my current streak as "0 days" or "1 day" (if I meditated today)

---

### User Story 2 - View Longest Streak (Priority: P2)

As a meditation app user, I want to see my longest streak ever achieved so that I can celebrate my past achievements and be motivated to beat my personal record.

**Why this priority**: This adds motivational context and helps users see their progress over time. It's valuable but secondary to seeing the current active streak.

**Independent Test**: Can be tested independently by establishing a 10-day streak, breaking it, then checking that the longest streak shows "10 days" even after the current streak resets.

**Acceptance Scenarios**:

1. **Given** my longest streak was 10 days and my current streak is 3 days, **When** I view the streak page, **Then** I see both "Current: 3 days" and "Longest: 10 days"
2. **Given** I just achieved a new personal record of 15 days, **When** I view the streak page, **Then** both current and longest show "15 days"
3. **Given** I'm a new user with only 1 session completed, **When** I view the streak page, **Then** both current and longest show "1 day"

---

### User Story 3 - Access Streak Page Easily (Priority: P1)

As a meditation app user, I want to easily navigate to the streak page from the main navigation so that I can check my progress anytime without searching through menus.

**Why this priority**: Without easy access, users won't use the feature. This is critical infrastructure for the feature to deliver value.

**Independent Test**: Can be tested by launching the app and verifying a clear, labeled navigation element (button/tab) that takes users to the streak page in one tap.

**Acceptance Scenarios**:

1. **Given** I'm on the home screen, **When** I tap the "activity" navigation button, **Then** I am taken to the streak display page
2. **Given** I'm on the streak page, **When** I tap the back button, **Then** I return to the previous screen
3. **Given** I'm on the end meditation session screan, **When** I tap the "My Activity" button. **Then** I am taken to the activity page with my streak.

---

### User Story 4 - View Total Sessions Completed (Priority: P3)

As a meditation app user, I want to see the total number of meditation sessions I've completed so that I can appreciate my overall commitment to the practice.

**Why this priority**: This provides additional motivational context but is not essential to the core streak feature. Nice to have for users who value absolute progress over consistency.

**Independent Test**: Can be tested independently by completing multiple sessions across different days (with and without breaks) and verifying the total count increases accurately.

**Acceptance Scenarios**:

1. **Given** I have completed 25 total sessions, **When** I view the streak page, **Then** I see "Total Sessions: 25"
2. **Given** I just completed a session, **When** I navigate to the streak page, **Then** the total sessions count has increased by 1
3. **Given** I'm a new user who just completed their first session, **When** I view the streak page, **Then** I see "Total Sessions: 1"

---

### Edge Cases

- What happens when a user crosses midnight and hasn't meditated yet that day? Does the streak break immediately or do they have until end of day?
Anwser: Streak breaks immediately. 
- How does the system handle timezone changes (e.g., user travels across timezones)?
Anwser: System always relay on mobile device time. If time is changed on device, streaks are calculated based on this time.
- What happens when a user completes multiple sessions in a single day? Does it count as one day or multiple?
Anwser: It counts as one day.
- How does the streak display handle very long streaks (e.g., 365+ days)? Does the UI need to accommodate large numbers?
Anwser: The longest streak is 365 day, when user should recieved a achievement for it. (Next iteration will be achivments for some activities).
- What happens for a brand new user who hasn't completed any sessions yet?
Anwser: It shows 0 days.
- How does the streak page handle rapid navigation (user taps back and forth quickly)?
Anwser: It should be smooth and fast.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the current meditation streak in days on the streak page
- **FR-002**: System MUST display the longest meditation streak ever achieved in days on the streak page
- **FR-003**: System MUST retrieve streak data from the existing streak tracking service (already implemented in feature 1-meditation-timer-streaks)
- **FR-004**: System MUST provide a navigation element from the home screen to access the streak page in one tap
- **FR-005**: System MUST display the total number of completed meditation sessions
- **FR-006**: System MUST show a clear visual hierarchy distinguishing current streak from longest streak
- **FR-007**: System MUST handle the case where no sessions have been completed (show "0 days" or appropriate empty state)
- **FR-008**: System MUST update the displayed streak counts when the user navigates to the page (fetch latest data)
- **FR-009**: System MUST provide a back navigation option to return to the previous screen
- **FR-010**: System MUST maintain consistency with the existing app's minimalistic design (#FAFAFA background, #1A1A1A text)

### Key Entities

- **Streak Data**: Current streak (number of consecutive days), longest streak (historical maximum), and total sessions completed. This data is already being tracked by the existing streaks service and stored in AsyncStorage.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can view their current streak count within 2 taps from the home screen
- **SC-002**: The streak display page loads and displays data in under 500ms
- **SC-003**: Users can distinguish between current streak and longest streak at a glance (within 3 seconds of viewing the page)
- **SC-004**: 100% accuracy between displayed streak and actual calculated streak from the streaks service
- **SC-005**: The page is accessible and usable following the same standards as existing screens (large touch targets, clear typography)

## Assumptions

- The existing streak tracking logic in the streaks service (`/apps/mobile/app/services/streaks.ts`) is accurate and will be reused without modification
- Streak data is already being persisted to AsyncStorage by the existing implementation
- A "day" is defined by the user's local device timezone (consistent with existing streak tracking)
- The streak page will be added as a new route in the existing Expo Router navigation structure
- The design will follow the existing minimalistic style guide from feature 1-meditation-timer-streaks

## Dependencies

- Feature 1-meditation-timer-streaks must be complete (streaks service and data persistence already implemented)
- Existing navigation structure in the app (to add the new streak page route)
- AsyncStorage access for retrieving streak data

## Out of Scope

- Modifying the existing streak calculation logic
- Adding calendar views or detailed session history
- Social features (sharing streaks, comparing with others)
- Notifications or reminders related to streaks
- Detailed analytics or charts showing streak trends over time
- Editing or manually adjusting streak data
