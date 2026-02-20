# Implementation Plan: Meditation Content Restructure

**Branch**: `005-meditation-content-restructure` | **Date**: 2026-02-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-meditation-content-restructure/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Restructure meditation exercises and lessons to align with the comprehensive Anapanasati methodology from content.md. This involves:
- Updating meditation exercises to include stage-by-stage breakdowns with timing and technique descriptions
- Restructuring the three existing presets (Beginner/Experienced/Advanced) to match the 15-min/30-min/60-min block structure
- Updating lesson content to cover Anapanasati philosophy, posture, the 5 meditation stages, obstacle techniques, and terminology
- Maintaining zero regression on existing timer, streak, and session functionality

This is a **content-only update** - no changes to timer logic, UI components, or data persistence mechanisms.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (React Native with Expo SDK 54)  
**Primary Dependencies**: React Native 0.81.5, Expo Router 6.0.15, AsyncStorage 2.2.0  
**Storage**: On-device AsyncStorage (existing) - no changes required  
**Testing**: Manual verification against acceptance criteria (constitution allows manual testing for content updates)  
**Target Platform**: iOS 15+ and Android (existing mobile app)
**Project Type**: Mobile (React Native Expo managed workflow)  
**Performance Goals**: Instant content loading (bundled data), no UI performance impact  
**Constraints**: Offline-capable (bundled content), no backend, maintain existing timer accuracy ±1 sec/min  
**Scale/Scope**: 3 presets, ~12 exercises, ~10 lessons, 0 new screens (content update only)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Mobile-First, Offline-Ready ✅
- **Status**: PASS
- **Rationale**: Content update maintains offline-first architecture. All meditation content bundled in app, no network required. Uses existing AsyncStorage for persistence.

### II. Accessibility & Simplicity ✅
- **Status**: PASS
- **Rationale**: Content changes improve clarity by providing structured stage descriptions. No UI changes, maintains existing navigation patterns. Text content follows readable, distraction-free principles.

### III. Test-First MVP Scope ✅
- **Status**: PASS
- **Rationale**: Content-only update. Acceptance criteria defined in spec (US1-US3). Manual verification sufficient per constitution ("manual run-through of user scenarios"). No timer/streak logic changes requiring automated tests.

### IV. Performance & Reliability ✅
- **Status**: PASS
- **Rationale**: Bundled content loads instantly. No impact on timer accuracy or UI smoothness. No new backgrounding/resume logic. Zero regression risk to existing functionality.

### V. Privacy by Default ✅
- **Status**: PASS
- **Rationale**: No data collection changes. Content stays on device. No new analytics or tracking. Maintains existing privacy posture.

### Mobile App Constraints ✅
- **Status**: PASS
- **Rationale**: 
  - Platforms: iOS/Android unchanged
  - Data: On-device only, no storage changes
  - Audio: No audio changes
  - Time: No streak logic changes
  - Network: Remains offline-capable
  - Permissions: No new permissions
  - Localization: English only (existing constraint)

**Overall Gate Status**: ✅ PASS - All constitution principles satisfied

---

## Post-Design Constitution Re-evaluation

*Re-checked after Phase 1 design completion*

### Design Artifacts Review

**Generated Artifacts**:
- ✅ `research.md` - Technical decisions documented
- ✅ `data-model.md` - TypeScript interfaces defined
- ✅ `quickstart.md` - Developer implementation guide
- ✅ Agent context updated with technology stack

**Design Decisions Validation**:

1. **Data Structure Changes**: Extended existing `Exercise` interface with optional fields (`stages?`, `blockLevel?`, `description?`)
   - ✅ Maintains backward compatibility
   - ✅ No breaking changes to existing timer/streak logic
   - ✅ Aligns with "Simplicity" principle (Principle II)

2. **Content Organization**: Three new Anapanasati exercises replacing 12 generic exercises
   - ✅ Simplifies user experience (one exercise per preset vs multiple)
   - ✅ Maintains offline-first architecture (bundled content)
   - ✅ Aligns with "Mobile-First, Offline-Ready" (Principle I)

3. **Testing Strategy**: Manual verification per constitution allowance
   - ✅ "Manual run-through of user scenarios before merge" (Constitution §Development Workflow)
   - ✅ Content-only update doesn't require automated tests
   - ✅ Aligns with "Test-First MVP Scope" (Principle III)

4. **Performance Impact**: <150 KB bundle size increase, <1 MB memory
   - ✅ Negligible impact on mobile performance
   - ✅ Instant content loading (bundled data)
   - ✅ Aligns with "Performance & Reliability" (Principle IV)

5. **Privacy Posture**: No changes to data collection or storage
   - ✅ Content stays on device
   - ✅ No new analytics or tracking
   - ✅ Aligns with "Privacy by Default" (Principle V)

### Constitution Compliance Post-Design

All principles remain satisfied after design phase:

- **I. Mobile-First, Offline-Ready**: ✅ PASS - Bundled content, no network required
- **II. Accessibility & Simplicity**: ✅ PASS - Clearer structure, no UI complexity added
- **III. Test-First MVP Scope**: ✅ PASS - Manual testing sufficient for content update
- **IV. Performance & Reliability**: ✅ PASS - Zero impact on timer accuracy or UI smoothness
- **V. Privacy by Default**: ✅ PASS - No data collection changes

**Final Gate Status**: ✅ PASS - Design maintains full constitution compliance

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
apps/mobile/app/
├── data/
│   ├── exercises.ts          # MODIFY: Add stage breakdown to Exercise interface
│   ├── presets.ts            # MODIFY: Update descriptions to match block structure
│   └── lessons/              # MODIFY: Update lesson content files
│       ├── content.md        # SOURCE: Anapanasati guide (reference only)
│       └── [lesson files]    # MODIFY: Update with Anapanasati content
├── lessons/
│   ├── index.tsx             # NO CHANGE: Lesson list screen
│   └── [id].tsx              # NO CHANGE: Lesson detail screen
├── preset.tsx                # NO CHANGE: Preset selection screen
└── player.tsx                # NO CHANGE: Meditation timer screen

specs/005-meditation-content-restructure/
├── plan.md                   # This file
├── research.md               # Phase 0 output
├── data-model.md             # Phase 1 output
├── quickstart.md             # Phase 1 output
└── checklists/
    └── requirements.md       # Already created
```

**Structure Decision**: Mobile app (Option 3). This is a content-only update affecting data files in `apps/mobile/app/data/`. No new screens, components, or services. Existing UI components (`preset.tsx`, `player.tsx`, `lessons/`) will automatically display updated content through their existing data bindings.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**Status**: N/A - No constitution violations. All gates passed.
