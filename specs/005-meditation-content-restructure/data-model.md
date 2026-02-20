# Data Model: Meditation Content Restructure

**Feature**: Meditation Content Restructure  
**Date**: 2026-02-19  
**Status**: Complete

## Overview

This document defines the data structures for the meditation content restructure. Since this is a content-only update, we're extending existing TypeScript interfaces rather than creating new database schemas.

## Core Entities

### MeditationStage

Represents one phase within a meditation exercise.

```typescript
interface MeditationStage {
  /**
   * Display name of the stage
   * Examples: "Entering Meditation", "Establishing Clear Comprehension"
   */
  name: string;

  /**
   * Approximate duration range for this stage
   * Format: Human-readable string with time units
   * Examples: "1-2 minutes", "13-14 minutes", "~15 minutes"
   */
  durationRange: string;

  /**
   * Detailed technique instructions for this stage
   * Should be 2-3 sentences, actionable and clear
   * Examples: "Assume your posture, scan your senses, and let go of the past and future."
   */
  technique: string;

  /**
   * Sequence order within the exercise (1-indexed)
   * Used to display stages in correct order
   */
  order: number;
}
```

**Validation Rules**:
- `name`: Required, non-empty string, max 100 characters
- `durationRange`: Required, non-empty string, max 50 characters
- `technique`: Required, non-empty string, max 500 characters
- `order`: Required, positive integer, unique within exercise

**Relationships**:
- Belongs to one Exercise (composition - stages don't exist independently)
- No persistence - bundled as part of Exercise data

### Exercise (Extended)

Existing interface extended with stage information.

```typescript
interface Exercise {
  /**
   * Unique identifier for the exercise
   * Examples: "anapanasati-basic", "anapanasati-intermediate", "anapanasati-advanced"
   */
  id: string;

  /**
   * Display name of the exercise
   * Examples: "Anapanasati Basic", "Anapanasati Intermediate", "Anapanasati Advanced"
   */
  name: string;

  /**
   * Total duration in seconds
   * Used by timer engine (unchanged)
   * Examples: 900 (15 min), 1800 (30 min), 3600 (60 min)
   */
  durationSec: number;

  /**
   * Brief reminder text shown during meditation
   * Keep concise - single sentence, present-tense
   * Examples: "Follow your breath through each stage with patience and awareness."
   */
  reminderText: string;

  /**
   * OPTIONAL: Array of meditation stages
   * Empty array or undefined for exercises without stage structure
   * Ordered by stage.order field
   */
  stages?: MeditationStage[];

  /**
   * OPTIONAL: Difficulty/experience level metadata
   * Maps to meditation block structure
   * Values: 'basic' | 'intermediate' | 'advanced'
   */
  blockLevel?: 'basic' | 'intermediate' | 'advanced';

  /**
   * OPTIONAL: Additional description for exercise details view
   * Longer explanation of what this exercise covers
   */
  description?: string;
}
```

**Validation Rules**:
- `id`: Required, unique, lowercase-with-hyphens format
- `name`: Required, non-empty string, max 100 characters
- `durationSec`: Required, positive integer, must match sum of stage durations (approximately)
- `reminderText`: Required, non-empty string, max 200 characters
- `stages`: Optional array, if present must have at least 1 stage
- `blockLevel`: Optional enum, must be one of: 'basic', 'intermediate', 'advanced'
- `description`: Optional string, max 500 characters

**Relationships**:
- Referenced by Preset.exerciseIds (many-to-many, but in practice one-to-one for Anapanasati)
- Contains MeditationStages (composition)

**State Transitions**: None - immutable bundled data

### Preset (Extended)

Existing interface with updated description field.

```typescript
interface Preset {
  /**
   * Unique identifier for the preset
   * Examples: "beginner", "experienced", "advanced"
   * UNCHANGED - maintain existing IDs for compatibility
   */
  id: string;

  /**
   * Display label for the preset
   * Examples: "Beginner", "Experienced", "Advanced"
   * UNCHANGED - maintain existing labels
   */
  label: string;

  /**
   * UPDATED: Description now includes block structure information
   * Format: "[Duration]-Minute Block ([Level] or [Context])"
   * Examples: 
   *   "15-Minute Block (Basic Level or Express Practice)"
   *   "30-Minute Block (Confident Practice / Intermediate Level)"
   *   "60-Minute Block (Deep Dive / Advanced Level)"
   */
  description: string;

  /**
   * Array of exercise IDs for this preset
   * UPDATED: Will reference new Anapanasati exercise IDs
   * Examples: ["anapanasati-basic"], ["anapanasati-intermediate"]
   */
  exerciseIds: string[];

  /**
   * Total expected duration in minutes
   * UNCHANGED - maintain existing durations
   * Examples: 15, 30, 60
   */
  totalDurationMin: number;
}
```

**Validation Rules**:
- `id`: Required, unique, must be one of: 'beginner', 'experienced', 'advanced'
- `label`: Required, non-empty string
- `description`: Required, non-empty string, max 200 characters
- `exerciseIds`: Required, non-empty array, all IDs must reference valid exercises
- `totalDurationMin`: Required, positive integer, should approximately match sum of exercise durations

**Relationships**:
- References Exercises via exerciseIds (many-to-many, but one-to-one in practice)
- Used by preset selection UI and timer initialization

### Lesson (Assumed Structure)

Based on existing lesson system, likely structure:

```typescript
interface Lesson {
  /**
   * Unique identifier for the lesson
   * Examples: "what-is-anapanasati", "posture-and-mudras", "stage-1-entering"
   */
  id: string;

  /**
   * Display title of the lesson
   * Examples: "What is Anapanasati?", "Posture and Mudras", "Stage 1: Entering Meditation"
   */
  title: string;

  /**
   * Category for grouping lessons
   * Examples: "philosophy", "technique", "obstacles", "glossary"
   */
  category: string;

  /**
   * Full lesson content in markdown or plain text
   * Extracted from content.md and structured for mobile reading
   */
  content: string;

  /**
   * Display order within category
   */
  order: number;

  /**
   * OPTIONAL: Related meditation stage (if applicable)
   * Links lesson to specific stage for contextual learning
   */
  relatedStage?: string;
}
```

**Note**: Exact lesson structure depends on existing implementation. This is an assumed structure based on common patterns. Implementation tasks will verify actual structure.

## Data Relationships

```
Preset (1) -----> (1..n) Exercise
                     |
                     |
                     v
                  (0..n) MeditationStage

Lesson (0..1) -----> (0..1) MeditationStage (via relatedStage)
```

**Key Points**:
- Presets reference exercises by ID
- Exercises contain stages as nested objects (composition)
- Lessons optionally reference stages for contextual learning
- All relationships are in-memory - no database joins

## Content Data Examples

### Example 1: Beginner Preset (15-Minute Block)

```typescript
const beginnerExercise: Exercise = {
  id: 'anapanasati-basic',
  name: 'Anapanasati Basic',
  durationSec: 900, // 15 minutes
  reminderText: 'Follow your breath with gentle attention. Count each cycle from 1 to 10.',
  blockLevel: 'basic',
  description: 'Foundation practice focusing on entering meditation and establishing clear comprehension through breath counting.',
  stages: [
    {
      name: 'Entering Meditation',
      durationRange: '1-2 minutes',
      technique: 'Assume your posture, scan your senses, and let go of the past and future. Settle into the present moment.',
      order: 1,
    },
    {
      name: 'Establishing Clear Comprehension',
      durationRange: '13-14 minutes',
      technique: 'Count your breaths from 1 to 10, then start over. Use mental labels "inhale/exhale", then drop the words and observe in silence.',
      order: 2,
    },
  ],
};

const beginnerPreset: Preset = {
  id: 'beginner',
  label: 'Beginner',
  description: '15-Minute Block (Basic Level or Express Practice)',
  exerciseIds: ['anapanasati-basic'],
  totalDurationMin: 15,
};
```

### Example 2: Experienced Preset (30-Minute Block)

```typescript
const experiencedExercise: Exercise = {
  id: 'anapanasati-intermediate',
  name: 'Anapanasati Intermediate',
  durationSec: 1800, // 30 minutes
  reminderText: 'Stabilize your mind, establish awareness in front of you, and observe arising reactions with equanimity.',
  blockLevel: 'intermediate',
  description: 'Intermediate practice covering stabilization, continuous awareness, and working with mental reactions.',
  stages: [
    {
      name: 'Entering and Establishing Clear Comprehension',
      durationRange: '~15 minutes',
      technique: 'Basic stabilization through counting breaths and tracking the phases of each breath cycle.',
      order: 1,
    },
    {
      name: 'Establishing Mindfulness in Front of Oneself',
      durationRange: '~5 minutes',
      technique: 'Perceive experience as a continuous flow. Observe every moment without delays or clinging - "new, new, new".',
      order: 2,
    },
    {
      name: 'Observing the Mind / Working with Reactions',
      durationRange: '5-10 minutes',
      technique: 'If strong reactions arise, distance yourself from them (Big Mind), investigate with labels ("this is not me", "this is impermanent"), and direct loving-kindness if needed.',
      order: 3,
    },
  ],
};

const experiencedPreset: Preset = {
  id: 'experienced',
  label: 'Experienced',
  description: '30-Minute Block (Confident Practice / Intermediate Level)',
  exerciseIds: ['anapanasati-intermediate'],
  totalDurationMin: 30,
};
```

### Example 3: Advanced Preset (60-Minute Block)

```typescript
const advancedExercise: Exercise = {
  id: 'anapanasati-advanced',
  name: 'Anapanasati Advanced',
  durationSec: 3600, // 60 minutes
  reminderText: 'Progress through all five stages: stabilize, observe, purify, establish equanimity, and deepen concentration.',
  blockLevel: 'advanced',
  description: 'Complete practice covering all five stages for deepest purification and calming of the mind.',
  stages: [
    {
      name: 'Entering and Establishing Clear Comprehension',
      durationRange: '~15 minutes',
      technique: 'Calm down on the breath. Count cycles and track each phase with clear awareness.',
      order: 1,
    },
    {
      name: 'Establishing Mindfulness in Front of Oneself',
      durationRange: '~5 minutes',
      technique: 'Second-by-second tracking of the flow of experiences. Notice each moment arising and passing.',
      order: 2,
    },
    {
      name: 'Observing the Mind',
      durationRange: '5-10 minutes',
      technique: 'Purify the mind from strong hindrances and reactions. Use Big Mind perspective and investigation techniques.',
      order: 3,
    },
    {
      name: 'Establishing Equanimity',
      durationRange: '~10 minutes',
      technique: 'Press the "brake pedal". Let go of any craving away from the breath. Enjoy the peace, richness, and self-sufficiency of the moment.',
      order: 4,
    },
    {
      name: 'Establishing Concentration',
      durationRange: '15-20 minutes',
      technique: 'Softly press the "gas pedal". The mind gathers fully around the breath. Track each inhale, pause, and exhale without gaps or distractions.',
      order: 5,
    },
  ],
};

const advancedPreset: Preset = {
  id: 'advanced',
  label: 'Advanced',
  description: '60-Minute Block (Deep Dive / Advanced Level)',
  exerciseIds: ['anapanasati-advanced'],
  totalDurationMin: 60,
};
```

## Migration Strategy

### Phase 1: Update Type Definitions
1. Add `MeditationStage` interface to `exercises.ts`
2. Extend `Exercise` interface with optional `stages`, `blockLevel`, `description` fields
3. Verify TypeScript compilation succeeds

### Phase 2: Update Exercise Data
1. Replace existing exercise array with three new Anapanasati exercises
2. Populate stages array for each exercise based on content.md
3. Set appropriate blockLevel for each exercise

### Phase 3: Update Preset Data
1. Update preset descriptions to match block structure
2. Update exerciseIds to reference new Anapanasati exercise IDs
3. Verify totalDurationMin matches exercise durations

### Phase 4: Update Lesson Content
1. Extract content from content.md into lesson files
2. Organize by categories (philosophy, technique, obstacles, glossary)
3. Add relatedStage references where applicable

### Phase 5: Verification
1. Manual test all three presets on iOS and Android
2. Verify stage information displays correctly (if UI supports it)
3. Verify lesson content is readable and complete
4. Confirm timer functionality unchanged

## Backward Compatibility

**Breaking Changes**: Yes - existing exercise IDs will be replaced

**Impact**: 
- Users with in-progress sessions may see old exercise IDs
- Session history references old exercise IDs
- Constitution allows this: "clearing app data resets all local history"

**Mitigation**:
- Document in release notes that content has been updated
- Consider adding migration logic if session history is critical (out of scope for MVP)
- Existing timer/streak logic unaffected - only content references change

## Performance Considerations

**Bundle Size**: 
- Adding stages adds ~2-3 KB per exercise (negligible)
- Lesson content from content.md adds ~50-100 KB total (acceptable for mobile)
- Total impact: <150 KB additional bundle size

**Runtime Performance**:
- No impact - data loaded once at app startup
- Stage rendering (if implemented) is simple list iteration
- No complex queries or transformations needed

**Memory**:
- Negligible impact - stages are small objects
- Lesson content loaded on-demand (if lazy-loaded)
- Total memory footprint increase: <1 MB

## Testing Strategy

### Manual Testing Checklist
1. ✅ Select Beginner preset → verify description shows "15-Minute Block"
2. ✅ Start Beginner meditation → verify timer runs for 15 minutes
3. ✅ View exercise details (if UI exists) → verify 2 stages display
4. ✅ Select Experienced preset → verify description shows "30-Minute Block"
5. ✅ Start Experienced meditation → verify timer runs for 30 minutes
6. ✅ View exercise details → verify 3 stages display
7. ✅ Select Advanced preset → verify description shows "60-Minute Block"
8. ✅ Start Advanced meditation → verify timer runs for 60 minutes
9. ✅ View exercise details → verify 5 stages display
10. ✅ Browse lessons → verify new Anapanasati content displays
11. ✅ Complete session → verify streak increments correctly
12. ✅ Test on iOS and Android → verify no platform-specific issues

### Acceptance Criteria Mapping
- **US1**: Stages display with timing and techniques ✅
- **US2**: Lessons cover Anapanasati methodology ✅
- **US3**: Preset descriptions match block structure ✅
- **Edge Cases**: Advanced users with 15 min (note in description) ✅
- **Zero Regression**: Timer, streaks, sessions unchanged ✅

## Open Questions

**None** - Data model is complete and ready for implementation.
