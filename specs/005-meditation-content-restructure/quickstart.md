# Quickstart: Meditation Content Restructure

**Feature**: Meditation Content Restructure  
**Branch**: `005-meditation-content-restructure`  
**Date**: 2026-02-19

## Overview

This guide helps developers implement the meditation content restructure. This is a **content-only update** - no new screens, components, or logic. You'll be updating data files to align with the Anapanasati methodology.

## Prerequisites

- Familiarity with TypeScript and React Native
- Understanding of the existing meditation timer system
- Access to `/apps/mobile/app/lessons/content.md` (Anapanasati source material)

## Quick Start (5 minutes)

### 1. Review the Source Material

```bash
# Read the comprehensive Anapanasati guide
cat apps/mobile/app/lessons/content.md
```

Key sections to understand:
- **The 5 Stages**: Entering, Clear Comprehension, Mindfulness, Observing Mind, Equanimity, Concentration
- **Meditation Blocks**: 15-min (Basic), 30-min (Intermediate), 60-min (Advanced)
- **Techniques**: Breath counting, mental labels, Big Mind perspective

### 2. Understand Current Structure

```bash
# View current exercises
cat apps/mobile/app/data/exercises.ts

# View current presets
cat apps/mobile/app/data/presets.ts
```

**Current State**:
- 12 generic exercises (breath-awareness, body-scan, etc.)
- 3 presets combining multiple exercises
- No stage structure

**Target State**:
- 3 Anapanasati exercises (one per preset)
- Each exercise has structured stages
- Presets reference single comprehensive exercises

### 3. Update Type Definitions

**File**: `apps/mobile/app/data/exercises.ts`

Add the `MeditationStage` interface:

```typescript
export interface MeditationStage {
  name: string;           // e.g., "Entering Meditation"
  durationRange: string;  // e.g., "1-2 minutes"
  technique: string;      // Detailed instructions
  order: number;          // Sequence within exercise
}
```

Extend the `Exercise` interface:

```typescript
export interface Exercise {
  id: string;
  name: string;
  durationSec: number;
  reminderText: string;
  stages?: MeditationStage[];  // NEW: Optional stages array
  blockLevel?: 'basic' | 'intermediate' | 'advanced';  // NEW: Optional level
  description?: string;  // NEW: Optional longer description
}
```

### 4. Replace Exercise Data

**File**: `apps/mobile/app/data/exercises.ts`

Replace the entire `exercises` array with three new exercises. See `data-model.md` for complete examples.

**Quick Template**:

```typescript
export const exercises: Exercise[] = [
  {
    id: 'anapanasati-basic',
    name: 'Anapanasati Basic',
    durationSec: 900, // 15 minutes
    reminderText: 'Follow your breath with gentle attention. Count each cycle from 1 to 10.',
    blockLevel: 'basic',
    description: 'Foundation practice focusing on entering meditation and establishing clear comprehension.',
    stages: [
      {
        name: 'Entering Meditation',
        durationRange: '1-2 minutes',
        technique: 'Assume your posture, scan your senses, and let go of the past and future.',
        order: 1,
      },
      {
        name: 'Establishing Clear Comprehension',
        durationRange: '13-14 minutes',
        technique: 'Count your breaths from 1 to 10, then start over. Use mental labels "inhale/exhale".',
        order: 2,
      },
    ],
  },
  // ... intermediate and advanced exercises
];
```

### 5. Update Preset Descriptions

**File**: `apps/mobile/app/data/presets.ts`

Update only the `description` and `exerciseIds` fields:

```typescript
export const presets: Preset[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: '15-Minute Block (Basic Level or Express Practice)',  // UPDATED
    exerciseIds: ['anapanasati-basic'],  // UPDATED
    totalDurationMin: 15,
  },
  {
    id: 'experienced',
    label: 'Experienced',
    description: '30-Minute Block (Confident Practice / Intermediate Level)',  // UPDATED
    exerciseIds: ['anapanasati-intermediate'],  // UPDATED
    totalDurationMin: 30,
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: '60-Minute Block (Deep Dive / Advanced Level)',  // UPDATED
    exerciseIds: ['anapanasati-advanced'],  // UPDATED
    totalDurationMin: 60,
  },
];
```

### 6. Update Lesson Content

**Files**: `apps/mobile/app/data/lessons/` (exact structure TBD)

Extract content from `content.md` into lesson files. Organize by categories:

1. **Philosophy & Foundations**
   - What is Anapanasati?
   - Course structure
   - The 5 stages overview

2. **Physical Framework**
   - Posture (Chair, Burmese, Siddhasana)
   - Hand mudras (Dhyana, Bhumisparsa)
   - Environmental setup

3. **Meditation Techniques** (one lesson per stage)
   - Stage 1: Entering Meditation
   - Stage 2: Establishing Clear Comprehension
   - Stage 3: Establishing Mindfulness
   - Stage 4: Observing the Mind
   - Stage 5: Establishing Equanimity
   - Stage 6: Establishing Concentration

4. **Overcoming Obstacles**
   - Countering agitation
   - Countering lethargy

5. **Glossary**
   - Key terms (Anapanasati, Big Mind, Sati, Equanimity, etc.)

**Note**: Exact lesson file structure depends on existing implementation. Check current lesson files first.

## Testing Checklist

### Manual Testing (Required per Constitution)

```bash
# 1. Build and run on iOS
cd apps/mobile
npx expo start --ios

# 2. Test Beginner preset
# - Select Beginner from preset screen
# - Verify description shows "15-Minute Block (Basic Level or Express Practice)"
# - Start meditation
# - Verify timer runs for 15 minutes
# - Complete session
# - Verify streak increments

# 3. Test Experienced preset
# - Select Experienced
# - Verify description shows "30-Minute Block"
# - Start meditation
# - Verify timer runs for 30 minutes

# 4. Test Advanced preset
# - Select Advanced
# - Verify description shows "60-Minute Block"
# - Start meditation
# - Verify timer runs for 60 minutes

# 5. Test lessons
# - Browse lessons section
# - Verify new Anapanasati content displays
# - Verify all categories present

# 6. Build and run on Android
npx expo start --android
# Repeat tests 1-5
```

### Acceptance Criteria Verification

From `spec.md`:

- **US1 - Structured Exercises**: ✅ Each exercise has stages with timing and techniques
- **US2 - Updated Lessons**: ✅ Lessons cover Anapanasati methodology
- **US3 - Preset Descriptions**: ✅ Descriptions match block structure
- **Edge Cases**: ✅ 15-min note for advanced users in description
- **Zero Regression**: ✅ Timer, streaks, sessions work unchanged

## Common Issues & Solutions

### Issue 1: TypeScript Compilation Errors

**Symptom**: `Property 'stages' does not exist on type 'Exercise'`

**Solution**: Ensure you've added the optional `stages?` field to the `Exercise` interface. The `?` makes it optional for backward compatibility.

### Issue 2: Exercise Not Found

**Symptom**: Preset references exercise ID that doesn't exist

**Solution**: Verify `exerciseIds` in presets match the `id` field in exercises exactly. Check for typos.

### Issue 3: Timer Duration Mismatch

**Symptom**: Timer runs for wrong duration

**Solution**: Verify `durationSec` field matches the intended duration:
- 15 min = 900 seconds
- 30 min = 1800 seconds
- 60 min = 3600 seconds

### Issue 4: Stages Not Displaying

**Symptom**: UI doesn't show stage information

**Solution**: Check if the UI component rendering exercises accesses the `stages` field. If not, stages are for future enhancement - focus on updating the data structure for now.

## File Locations Reference

```
apps/mobile/app/
├── data/
│   ├── exercises.ts          # UPDATE: Add stages, replace exercises
│   ├── presets.ts            # UPDATE: Update descriptions and exerciseIds
│   └── lessons/              # UPDATE: Extract content from content.md
│       ├── content.md        # REFERENCE: Source material (do not modify)
│       └── [lesson files]    # UPDATE: Add Anapanasati lessons
├── preset.tsx                # NO CHANGE: Reads from presets.ts
├── player.tsx                # NO CHANGE: Reads from exercises.ts
└── lessons/
    ├── index.tsx             # NO CHANGE: Reads from lessons data
    └── [id].tsx              # NO CHANGE: Displays lesson content
```

## Development Workflow

### Step-by-Step Implementation

1. **Create feature branch** (already done)
   ```bash
   git checkout 005-meditation-content-restructure
   ```

2. **Update type definitions**
   - Add `MeditationStage` interface
   - Extend `Exercise` interface
   - Commit: "Add MeditationStage interface and extend Exercise"

3. **Replace exercise data**
   - Create three new Anapanasati exercises with stages
   - Commit: "Replace exercises with Anapanasati structure"

4. **Update preset data**
   - Update descriptions and exerciseIds
   - Commit: "Update preset descriptions for meditation blocks"

5. **Update lesson content**
   - Extract and organize content from content.md
   - Commit: "Update lessons with Anapanasati methodology"

6. **Manual testing**
   - Test all three presets on iOS
   - Test all three presets on Android
   - Verify lessons display correctly

7. **Create PR**
   - Reference spec: `specs/005-meditation-content-restructure/spec.md`
   - Include testing checklist in PR description
   - Request review

### Commit Message Guidelines

Follow conventional commits:

```
feat(content): add MeditationStage interface
feat(content): replace exercises with Anapanasati structure
feat(content): update preset descriptions for meditation blocks
feat(content): update lessons with Anapanasati methodology
docs(content): add meditation content restructure spec
```

## Performance Considerations

**Bundle Size Impact**: ~150 KB additional content (negligible)

**Runtime Performance**: No impact - data loaded once at startup

**Memory**: <1 MB additional memory footprint

## Rollback Plan

If issues arise after merge:

1. **Revert commit**: `git revert <commit-hash>`
2. **Cherry-pick fixes**: If partial revert needed
3. **User impact**: Users will see old exercise content again
4. **Data impact**: No data loss - AsyncStorage unchanged

## Next Steps After Implementation

1. **Run `/speckit.tasks`** to generate detailed task breakdown
2. **Implement tasks** following this quickstart guide
3. **Manual testing** per checklist above
4. **Create PR** with spec reference
5. **Get review** from at least one reviewer
6. **Merge** after approval and successful builds

## Additional Resources

- **Spec**: `specs/005-meditation-content-restructure/spec.md`
- **Research**: `specs/005-meditation-content-restructure/research.md`
- **Data Model**: `specs/005-meditation-content-restructure/data-model.md`
- **Source Material**: `apps/mobile/app/lessons/content.md`
- **Constitution**: `.specify/memory/constitution.md`

## Questions?

If you encounter issues not covered here:

1. Check `research.md` for technical decisions
2. Check `data-model.md` for complete examples
3. Review existing exercise/preset structure for patterns
4. Consult the Anapanasati source material in `content.md`

## Success Criteria

You're done when:

- ✅ All three presets have updated descriptions
- ✅ All three exercises have stage breakdowns
- ✅ Lessons cover Anapanasati methodology
- ✅ Manual testing passes on iOS and Android
- ✅ Timer, streaks, and sessions work unchanged
- ✅ PR approved and merged

**Estimated Implementation Time**: 4-6 hours for experienced developer
