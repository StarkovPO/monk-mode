# Research: Meditation Content Restructure

**Feature**: Meditation Content Restructure  
**Date**: 2026-02-19  
**Status**: Complete

## Overview

This document captures technical decisions and research findings for restructuring meditation content to align with the Anapanasati methodology. Since this is a content-only update with no new technical components, research focuses on content organization patterns and data structure decisions.

## Research Questions & Findings

### 1. How to Structure Stage Information in Exercise Data?

**Decision**: Extend the `Exercise` interface with a `stages` array containing structured stage objects.

**Rationale**:
- Maintains backward compatibility - existing exercises can have empty stages array
- Allows flexible stage definitions per exercise (2 stages for 15-min, 3 for 30-min, 5 for 60-min)
- Keeps data co-located with exercises for easy maintenance
- No database schema changes needed (bundled TypeScript data)

**Alternatives Considered**:
- **Separate stages.ts file**: Rejected because it creates unnecessary indirection and splits related content
- **String-based stage descriptions in reminderText**: Rejected because it lacks structure for timing and technique details
- **Nested exercise hierarchy**: Rejected as over-engineered for this simple content update

**Implementation Pattern**:
```typescript
interface MeditationStage {
  name: string;           // e.g., "Entering Meditation"
  durationRange: string;  // e.g., "1-2 minutes"
  technique: string;      // Detailed instructions
  order: number;          // Sequence within exercise
}

interface Exercise {
  id: string;
  name: string;
  durationSec: number;
  reminderText: string;
  stages?: MeditationStage[];  // Optional for backward compatibility
  blockLevel?: 'basic' | 'intermediate' | 'advanced';  // Optional metadata
}
```

### 2. How to Update Preset Descriptions Without Breaking Existing UI?

**Decision**: Update only the `description` field in existing presets, maintaining the same structure.

**Rationale**:
- Preset interface already has a `description` field designed for display text
- No UI changes needed - existing preset selection screen already renders descriptions
- Maintains preset IDs ('beginner', 'experienced', 'advanced') for consistency
- Zero risk of breaking existing timer/streak functionality

**Alternatives Considered**:
- **Add new blockDescription field**: Rejected as redundant - description field serves this purpose
- **Create new preset objects**: Rejected because it would require updating all references and risk breaking existing sessions
- **Add metadata object**: Rejected as over-engineered for simple text updates

**Implementation Pattern**:
```typescript
// Update existing preset descriptions
presets[0].description = '15-Minute Block (Basic Level or Express Practice)';
presets[1].description = '30-Minute Block (Confident Practice / Intermediate Level)';
presets[2].description = '60-Minute Block (Deep Dive / Advanced Level)';
```

### 3. How to Organize Lesson Content from content.md?

**Decision**: Extract content from content.md into structured lesson objects, organized by topic categories.

**Rationale**:
- content.md is comprehensive but not structured for app consumption
- Lessons should be bite-sized and focused on specific topics (posture, stages, obstacles)
- Existing lesson system likely uses a lessons array or directory structure
- Allows progressive learning rather than overwhelming users with full guide

**Content Organization**:
1. **Philosophy & Foundations** (Week 1-2 content)
   - What is Anapanasati?
   - Course structure and goals
   - The 5 meditation stages overview

2. **Physical Framework** (Week 1 content)
   - Posture: Chair, Burmese, Siddhasana
   - Hand mudras: Dhyana, Bhumisparsa
   - Environmental setup

3. **Meditation Techniques** (Week 2-6 content)
   - Stage 1: Entering Meditation
   - Stage 2: Establishing Clear Comprehension (breath counting)
   - Stage 3: Establishing Mindfulness "In Front of You"
   - Stage 4: Observing the Mind (Big Mind vs small mind)
   - Stage 5: Establishing Equanimity (brake pedal)
   - Stage 6: Establishing Concentration (gas pedal)

4. **Overcoming Obstacles** (Week 3-4 content)
   - Countering agitation
   - Countering lethargy
   - Working with reactions

5. **Glossary & Integration**
   - Key terms (Anapanasati, Big Mind, Sati, Equanimity, etc.)
   - Integration into daily life
   - Future paths

**Alternatives Considered**:
- **Single comprehensive lesson**: Rejected as too overwhelming for mobile reading
- **Week-by-week structure**: Rejected because app doesn't track course progress (out of scope)
- **External link to content.md**: Rejected because it breaks offline-first principle

### 4. How to Map Existing Exercises to New Stage Structure?

**Decision**: Replace existing generic exercises with Anapanasati-specific exercises aligned to the three meditation blocks.

**Rationale**:
- Current exercises (breath-awareness, body-scan, loving-kindness, etc.) don't align with Anapanasati stages
- The three presets should each have ONE comprehensive exercise with multiple stages, not multiple separate exercises
- Simplifies user experience - one meditation session = one exercise with clear stage progression
- Maintains total durations (15, 30, 60 minutes) but changes internal structure

**Mapping Strategy**:
```
OLD: Beginner preset → 3 separate exercises (breath-awareness, body-scan, gratitude-practice)
NEW: Beginner preset → 1 exercise "Anapanasati Basic" with 2 stages

OLD: Experienced preset → 5 separate exercises
NEW: Experienced preset → 1 exercise "Anapanasati Intermediate" with 3 stages

OLD: Advanced preset → 7 separate exercises
NEW: Advanced preset → 1 exercise "Anapanasati Advanced" with 5 stages
```

**Migration Consideration**: Existing user sessions reference old exercise IDs. Since this is MVP and constitution allows scope changes with spec updates, we can replace exercises. Users will see new content on next session.

**Alternatives Considered**:
- **Keep existing exercises, add new ones**: Rejected because it creates confusion with two different meditation systems
- **Gradual migration with feature flag**: Rejected as over-engineered for MVP content update
- **Preserve old exercises for history**: Rejected because constitution states "clearing app data resets all local history"

### 5. Best Practices for Meditation Content Presentation

**Research Findings**:
- **Timing Ranges vs Exact Times**: Use ranges (e.g., "1-2 minutes") to reduce pressure and allow natural flow
- **Technique Descriptions**: Balance detail with brevity - enough to guide but not overwhelm during practice
- **Progressive Disclosure**: Show stage overview before meditation, detailed techniques in lessons
- **Terminology**: Use authentic terms (Sati, Big Mind) with explanations rather than simplifying
- **Reminder Text**: Keep concise for during-meditation display, detailed techniques in stage descriptions

**Implementation Approach**:
- Stage descriptions: 2-3 sentences max, actionable instructions
- Lesson content: More detailed explanations with context and rationale
- Reminder text: Single sentence, present-tense, direct instruction

## Technical Dependencies

### Existing Systems (No Changes Required)
- **Timer Engine**: Continues to work with exercise.durationSec
- **Audio Cues**: Continues to work with existing audio service
- **Streak Tracking**: Continues to work with session completion
- **AsyncStorage**: No schema changes needed
- **UI Components**: All screens work with updated data structures

### Data Files to Modify
1. `/apps/mobile/app/data/exercises.ts` - Add stages to Exercise interface, replace exercise data
2. `/apps/mobile/app/data/presets.ts` - Update preset descriptions and exercise references
3. `/apps/mobile/app/data/lessons/` - Update lesson content files (exact structure TBD in data-model.md)

## Risk Assessment

### Low Risk
- **Content updates**: No code logic changes, only data
- **Backward compatibility**: Optional fields maintain compatibility
- **UI rendering**: Existing components handle new data structures

### Zero Risk
- **Timer functionality**: Untouched
- **Streak calculation**: Untouched
- **Data persistence**: Untouched
- **Audio system**: Untouched

### Mitigation Strategies
- Manual testing of all three presets before merge
- Verify lesson content displays correctly
- Confirm stage descriptions appear in UI (if implemented)
- Test on both iOS and Android per constitution

## Open Questions

**None** - All technical decisions resolved. Content-only update with clear implementation path.

## Next Steps

1. **Phase 1**: Generate data-model.md defining exact TypeScript interfaces
2. **Phase 1**: Create contracts/ (if needed - likely N/A for content update)
3. **Phase 1**: Generate quickstart.md for developers implementing the changes
4. **Phase 2**: Generate tasks.md with specific content update tasks (via /speckit.tasks)
