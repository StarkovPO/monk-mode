# Changelog

## [Unreleased]

### Added - Meditation Content Restructure (2026-02-19)

- **Anapanasati Meditation Structure**: Replaced 12 generic exercises with 3 comprehensive Anapanasati exercises
  - Basic (15-min): 2 stages - Entering Meditation, Establishing Clear Comprehension
  - Intermediate (30-min): 3 stages - Entering/Clear Comprehension, Mindfulness, Observing Mind
  - Advanced (60-min): 5 stages - Full progression through Entering, Mindfulness, Observing, Equanimity, Concentration

- **Stage-by-Stage Guidance**: Each exercise now includes detailed meditation stages with:
  - Stage name and duration range
  - Specific technique instructions
  - Sequential order for proper practice flow

- **Updated Preset Descriptions**: Meditation blocks now clearly indicate experience level and practice type
  - Beginner: "15-Minute Block (Basic Level or Express Practice)"
  - Experienced: "30-Minute Block (Confident Practice / Intermediate Level)"
  - Advanced: "60-Minute Block (Deep Dive / Advanced Level)"

### Changed

- Exercise durations adjusted to standard meditation blocks: 15, 30, and 60 minutes
- Preset exercise references updated to use new Anapanasati exercise IDs

### Technical

- Added `MeditationStage` interface with fields: name, durationRange, technique, order
- Extended `Exercise` interface with optional fields: stages, blockLevel, description
- Maintained backward compatibility with optional fields

### Notes

- Lesson content update (Phase 4) deferred - 17 lesson tasks remain for Anapanasati methodology
- All existing timer, streak, and session functionality unchanged
- Zero regression on core meditation features
