# Feature Specification: Meditation Content Restructure

**Feature Branch**: `005-meditation-content-restructure`  
**Created**: 2026-02-19  
**Status**: Draft  
**Input**: User description: "Restructure meditation content and exercises based on comprehensive Anapanasati guide with 15-minute, 30-minute, and 60-minute meditation blocks, each with specific stages and descriptions to guide users through proper meditation practice"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Structured Meditation Exercises with Stage Guidance (Priority: P1)

As a meditation practitioner, I want each meditation exercise to include detailed stage-by-stage instructions so that I understand what to focus on during each part of my practice and can perform the meditation correctly.

**Why this priority**: This is the core value proposition - users need clear, structured guidance to practice meditation effectively. Without stage descriptions, users don't know what to do during their session, making the meditation feature essentially unusable for proper practice.

**Independent Test**: Can be fully tested by selecting any meditation exercise and verifying that it displays clear stage-by-stage instructions (e.g., "Entering Meditation (1-2 min): Assume posture, scan senses..."). Delivers immediate value by transforming vague "meditation" into concrete, actionable steps.

**Acceptance Scenarios**:

1. **Given** I select the 15-minute Beginner meditation, **When** I view the exercise details, **Then** I see two stages: "Entering Meditation (1-2 minutes)" with posture and scanning instructions, and "Establishing Clear Comprehension (13-14 minutes)" with breath counting and labeling techniques
2. **Given** I select the 30-minute Experienced meditation, **When** I view the exercise details, **Then** I see three stages with timing and specific techniques for each: entering/clear comprehension, mindfulness in front of oneself, and observing the mind
3. **Given** I select the 60-minute Advanced meditation, **When** I view the exercise details, **Then** I see five stages with detailed descriptions: entering, mindfulness, observing mind, establishing equanimity, and establishing concentration

---

### User Story 2 - Updated Meditation Lessons with Anapanasati Content (Priority: P2)

As a user learning meditation, I want the lesson content to reflect the comprehensive Anapanasati methodology so that I understand the philosophy, techniques, and progression of the 8-week meditation course.

**Why this priority**: Lessons provide the educational foundation that helps users understand WHY they're doing specific techniques. This enhances the meditation experience but users can still meditate without reading lessons (using the stage instructions from US1).

**Independent Test**: Can be tested independently by browsing the lessons section and verifying that lessons cover topics from the Anapanasati guide (posture, mudras, the 5 stages, overcoming obstacles). Delivers educational value separate from the meditation timer.

**Acceptance Scenarios**:

1. **Given** I browse the lessons, **When** I open a lesson about meditation posture, **Then** I see detailed information about sitting positions (chair, Burmese, Siddhasana), spine alignment, hand mudras (Dhyana, Bhumisparsa), and proper physical setup
2. **Given** I read a lesson about the 5 stages, **When** I view the content, **Then** I see explanations of: establishing clear understanding (counting breaths), awareness "in front of you" (Sati), observing the mind (Big Mind vs small mind), establishing equanimity (brake pedal), and establishing concentration (gas pedal)
3. **Given** I'm struggling with agitation during meditation, **When** I find the "Overcoming Obstacles" lesson, **Then** I see specific techniques for countering agitation (renewal of resolve, phase-based commitment) and lethargy (physical stimulation, breath stimulation)

---

### User Story 3 - Preset Descriptions Aligned with Meditation Blocks (Priority: P3)

As a user choosing a meditation session, I want the preset descriptions to clearly explain what stages I'll practice and what level of experience each preset is designed for, so I can select the appropriate meditation for my skill level and available time.

**Why this priority**: Helps users make informed choices about which meditation to practice, but the core meditation functionality works without updated descriptions. This is polish that improves user experience.

**Independent Test**: Can be tested by viewing the preset selection screen and verifying descriptions match the new block structure (15-min = Basic/Express, 30-min = Intermediate/Confident, 60-min = Advanced/Deep Dive).

**Acceptance Scenarios**:

1. **Given** I'm on the preset selection screen, **When** I view the Beginner preset, **Then** I see it described as "15-Minute Block (Basic Level or Express Practice)" with a note that it focuses on mastering the first stage
2. **Given** I'm selecting a meditation, **When** I view the Experienced preset, **Then** I see it described as "30-Minute Block (Confident Practice / Intermediate Level)" ideal for mastering the third stage (Observing the Mind)
3. **Given** I want a deep practice, **When** I view the Advanced preset, **Then** I see it described as "60-Minute Block (Deep Dive / Advanced Level)" covering all five stages for deepest purification and calming

### Edge Cases

- What happens if a user is already familiar with advanced stages but only has 15 minutes? The 15-minute block description includes a note: "If you are already at more advanced stages but only have 15 minutes, you can skip the long preparation and proceed to the main technique of your current stage immediately after a short entry into meditation."
- How does the system handle users who don't understand meditation terminology (Big Mind, Sati, equanimity)? Lessons include a glossary section defining all key terms in plain language.
- What if users want to practice individual stages rather than full sequences? The stage descriptions are detailed enough that users can understand each stage independently, though the system doesn't enforce stage-by-stage progression.
- How are existing user sessions and streaks affected by the content restructure? No impact - this is a content-only update that doesn't change the timer functionality, duration tracking, or streak calculation.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST display meditation exercises with stage-by-stage breakdowns including stage name, duration range, and specific technique description
- **FR-002**: System MUST provide three meditation presets aligned with the block structure: 15-minute (Basic/Express), 30-minute (Intermediate/Confident), 60-minute (Advanced/Deep Dive)
- **FR-003**: System MUST include detailed stage descriptions for each meditation block: Entering Meditation, Establishing Clear Comprehension, Establishing Mindfulness, Observing the Mind, Establishing Equanimity, and Establishing Concentration
- **FR-004**: System MUST update lesson content to cover Anapanasati methodology including: course philosophy, posture and mudras, environmental setup, the 5 meditation stages, obstacle techniques, and key terminology
- **FR-005**: System MUST maintain existing timer functionality, duration tracking, and streak calculation while updating only the content and descriptions
- **FR-006**: System MUST provide technique-specific guidance for each stage (e.g., breath counting sequence for Clear Comprehension, "in front of you" visualization for Mindfulness, Big Mind perspective for Observing)
- **FR-007**: System MUST include practical instructions for overcoming common obstacles: agitation (renewal of resolve, phase-based commitment) and lethargy (physical/breath stimulation)
- **FR-008**: System MUST define a glossary of meditation terms (Anapanasati, Big Mind, Equanimity, Sati, Non-Attachment, Reaction, Small Mind) accessible to users

### Key Entities

- **Meditation Exercise**: Represents a single meditation practice session. Attributes include: unique identifier, name, total duration, stage breakdown (array of stages with names, duration ranges, and technique descriptions), difficulty level (Basic/Intermediate/Advanced), and reminder text for during practice.

- **Meditation Stage**: Represents one phase within a meditation exercise. Attributes include: stage name (e.g., "Entering Meditation", "Establishing Clear Comprehension"), duration range (e.g., "1-2 minutes", "13-14 minutes"), technique description (specific instructions on what to do), and order within the exercise sequence.

- **Meditation Preset**: Represents a predefined meditation configuration. Attributes include: preset identifier (beginner/experienced/advanced), display label, block description (15-min Basic, 30-min Intermediate, 60-min Advanced), total expected duration, associated exercise identifiers, and target skill level.

- **Lesson**: Represents educational content about meditation. Attributes include: lesson identifier, title, category (philosophy, technique, obstacles, terminology), content text (detailed explanation), and relationships to meditation stages (which lessons explain which stages).

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Users can view detailed stage-by-stage instructions for any meditation exercise within 2 taps from the preset selection screen
- **SC-002**: 100% of meditation exercises display clear timing information for each stage (e.g., "1-2 minutes", "13-14 minutes") so users know what to expect
- **SC-003**: All three preset descriptions accurately reflect their corresponding block structure (15-min/30-min/60-min) and skill level (Basic/Intermediate/Advanced)
- **SC-004**: Lesson content covers all 5 meditation stages from the Anapanasati guide with specific technique instructions for each stage
- **SC-005**: Users can access a glossary defining all meditation terminology used in exercises and lessons (minimum 7 key terms: Anapanasati, Big Mind, Equanimity, Sati, Non-Attachment, Reaction, Small Mind)
- **SC-006**: Existing meditation timer functionality, streak tracking, and session history remain fully functional after content restructure (zero regression)
- **SC-007**: Users can find obstacle-overcoming techniques (agitation and lethargy) in lesson content with specific, actionable steps

## Assumptions

- The existing meditation timer, exercise sequencing, and audio cue functionality will remain unchanged - this is purely a content update
- Users are familiar with basic meditation concepts or willing to read lessons to learn
- The three existing presets (Beginner/Experienced/Advanced) map directly to the three meditation blocks (15-min/30-min/60-min)
- Exercise durations in the existing system already align with the block durations (15, 30, and 60 minutes approximately)
- The content.md file provided contains authoritative information from the "Direct Contact" Anapanasati course
- Users will access stage descriptions either before starting meditation or have them available during practice
- The app's existing lesson structure can accommodate the new Anapanasati content without requiring new lesson categories
- Meditation terminology (Big Mind, Sati, etc.) will be explained in lessons rather than simplified or avoided

## Dependencies

- Existing meditation timer system (Feature 1: meditation-timer-streaks)
- Existing lesson display system (Feature 1: meditation-timer-streaks)
- Existing preset selection UI (Feature 1: meditation-timer-streaks)
- Content from `/apps/mobile/app/lessons/content.md` (Anapanasati guide)

## Out of Scope

- Changes to timer functionality, duration tracking, or countdown mechanics
- New meditation presets beyond the existing three (Beginner/Experienced/Advanced)
- Interactive stage progression (automatically advancing through stages)
- Audio guidance or voice instructions for each stage
- User customization of stage durations or sequences
- Progress tracking through the 8-week Anapanasati course
- Integration with external meditation content or courses
- Meditation in motion or daily mindfulness reminders (mentioned in content.md but not part of this restructure)
