---
description: "Implementation tasks for App Internationalization (i18n)"
---

# Tasks: App Internationalization (i18n)

**Input**: Design documents from `/specs/004-app-i18n/`
**Prerequisites**: plan.md, spec.md

**Tests**: Manual testing on iOS and Android with different locale settings

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Mobile app**: `apps/mobile/app/`
- All paths are absolute from repository root

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create type definitions, storage infrastructure, and translation file structure needed by all user stories

- [x] T001 [P] Create TypeScript interfaces for i18n in apps/mobile/app/types/i18n.ts
- [x] T002 Add language storage key constant to apps/mobile/app/services/storage.ts
- [x] T003 Create locales directory structure apps/mobile/app/locales/

**Checkpoint**: Type definitions and folder structure ready - i18n implementation can begin

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core i18n service and translation files that MUST be complete before ANY user story UI can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create core i18n service with initI18n(), getCurrentLanguage(), setLanguage() in apps/mobile/app/services/i18n.ts
- [x] T005 Implement t(key) translation function with English fallback in apps/mobile/app/services/i18n.ts
- [x] T006 Implement getSupportedLanguages() returning all language configs in apps/mobile/app/services/i18n.ts
- [x] T007 [P] Create English translation file (en.json) with home menu keys in apps/mobile/app/locales/en.json
- [x] T008 [P] Create Russian translation file (ru.json) with home menu keys in apps/mobile/app/locales/ru.json
- [x] T009 [P] Create Spanish translation file (es.json) with home menu keys in apps/mobile/app/locales/es.json
- [x] T010 [P] Create French translation file (fr.json) with home menu keys in apps/mobile/app/locales/fr.json
- [x] T011 [P] Create German translation file (de.json) with home menu keys in apps/mobile/app/locales/de.json
- [x] T012 [P] Create Korean translation file (ko.json) with home menu keys in apps/mobile/app/locales/ko.json
- [x] T013 Create locales index file exporting all translations in apps/mobile/app/locales/index.ts
- [x] T014 Initialize i18n on app startup in apps/mobile/app/_layout.tsx

**Checkpoint**: i18n service complete with all 6 languages - UI components and integrations can now proceed in parallel

---

## Phase 3: User Story 1 - Automatic Language Detection (Priority: P1) 🎯 MVP

**Goal**: Users see the app in their device language automatically on first launch, with fallback to English for unsupported languages

**Independent Test**: Install app on devices with different locale settings (Russian, Spanish, Korean, Japanese) and verify correct language is displayed or defaults to English

### Implementation for User Story 1

- [x] T015 [US1] Implement device locale detection using expo-localization in apps/mobile/app/services/i18n.ts
- [x] T016 [US1] Extract primary language code from regional locales (en from en-US) in apps/mobile/app/services/i18n.ts
- [x] T017 [US1] Implement automatic language selection on first launch in apps/mobile/app/services/i18n.ts
- [x] T018 [US1] Implement fallback to English for unsupported locales in apps/mobile/app/services/i18n.ts
- [x] T019 [US1] Replace hardcoded home menu strings with t() calls in apps/mobile/app/index.tsx
- [x] T020 [US1] Ensure "Monk Mode" app name is never translated (hardcoded string) in apps/mobile/app/index.tsx
- [ ] T021 [US1] Test on iOS simulator with Russian locale → verify Russian text appears
- [ ] T022 [US1] Test on Android emulator with Spanish locale → verify Spanish text appears
- [ ] T023 [US1] Test on iOS simulator with Korean locale → verify Korean text appears
- [ ] T024 [US1] Test with unsupported locale (Japanese) → verify English fallback
- [ ] T025 [US1] Verify "Monk Mode" app name stays in English in all languages

**Checkpoint**: User Story 1 complete - users see app in their device language automatically. This is the MVP foundation!

---

## Phase 4: User Story 2 - Language Switcher UI (Priority: P1) 🎯 MVP

**Goal**: Users can manually change the app language via a flag icon dropdown on the home menu, with immediate effect and persistence across app restarts

**Independent Test**: Open app, tap flag icon, select different languages from dropdown, verify immediate translation and persistence after app restart

### Implementation for User Story 2

- [x] T026 [P] [US2] Create LanguageSwitcher component with flag icon in apps/mobile/app/components/LanguageSwitcher.tsx
- [x] T027 [US2] Implement dropdown modal with all 6 language options in apps/mobile/app/components/LanguageSwitcher.tsx
- [x] T028 [US2] Display flag emoji and native name for each language in apps/mobile/app/components/LanguageSwitcher.tsx
- [x] T029 [US2] Implement language selection handler that calls setLanguage() in apps/mobile/app/components/LanguageSwitcher.tsx
- [x] T030 [US2] Persist selected language to AsyncStorage in apps/mobile/app/services/i18n.ts
- [x] T031 [US2] Load saved language preference on app startup in apps/mobile/app/services/i18n.ts
- [x] T032 [US2] Implement dropdown close on outside tap in apps/mobile/app/components/LanguageSwitcher.tsx
- [x] T033 [US2] Highlight current language in dropdown in apps/mobile/app/components/LanguageSwitcher.tsx
- [x] T034 [US2] Add LanguageSwitcher to home menu (top-right position) in apps/mobile/app/index.tsx
- [x] T035 [P] [US2] Style flag icon (32x32pt, 44x44pt tap area) in apps/mobile/app/components/LanguageSwitcher.tsx
- [x] T036 [P] [US2] Style dropdown modal (card style, semi-transparent overlay) in apps/mobile/app/components/LanguageSwitcher.tsx
- [x] T037 [P] [US2] Add accessibility labels for all language options in apps/mobile/app/components/LanguageSwitcher.tsx
- [ ] T038 [US2] Test tapping flag icon → verify dropdown opens with all 6 flags
- [ ] T039 [US2] Test selecting Russian → verify immediate translation and dropdown closes
- [ ] T040 [US2] Test selecting Spanish → close app → reopen → verify Spanish persists
- [ ] T041 [US2] Test tapping outside dropdown → verify dropdown closes without change
- [ ] T042 [US2] Test tapping current language in dropdown → verify dropdown closes
- [ ] T043 [US2] Test switching between all 6 languages → verify each translates correctly
- [ ] T044 [US2] Verify language switching happens in <100ms (no visible lag)

**Checkpoint**: User Story 2 complete - users can manually select their preferred language. MVP is now feature-complete!

---

## Phase 5: User Story 3 - Translation Management (Priority: P2)

**Goal**: System is architected to allow easy addition of new languages and translation keys without code changes, with graceful handling of missing translations

**Independent Test**: Add a test language (Italian) by creating a JSON file and verify it appears in dropdown. Remove a translation key and verify English fallback

### Implementation for User Story 3

- [x] T045 [P] [US3] Implement missing translation key fallback to English in apps/mobile/app/services/i18n.ts
- [x] T046 [P] [US3] Implement malformed translation file error handling in apps/mobile/app/services/i18n.ts
- [x] T047 [US3] Add version field to all translation JSON files for future migrations in apps/mobile/app/locales/*.json
- [x] T048 [US3] Document translation file structure and key naming conventions in apps/mobile/app/locales/README.md
- [x] T049 [US3] Create example for adding new language in quickstart documentation
- [ ] T050 [US3] Test adding new language file (it.json for Italian) → verify appears in dropdown
- [ ] T051 [US3] Test removing translation key from Russian → verify shows English text for that key
- [ ] T052 [US3] Test adding new translation key to all languages → verify appears correctly
- [ ] T053 [US3] Test with malformed JSON file → verify app doesn't crash, falls back to English
- [ ] T054 [US3] Test with empty translation file → verify falls back to English for entire language

**Checkpoint**: User Story 3 complete - translation system is maintainable and extensible for future growth

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, edge case testing, and documentation updates

- [ ] T055 [P] Test all 6 languages on iOS → verify emoji flags render correctly
- [ ] T056 [P] Test all 6 languages on Android → verify emoji flags render correctly
- [ ] T057 Test Cyrillic characters (Russian) display correctly on all devices
- [ ] T058 Test Korean characters display correctly on all devices
- [ ] T059 Test accented characters (French, Spanish, German) display correctly
- [ ] T060 Test very long German translations → verify text wrapping works
- [ ] T061 Test with VoiceOver enabled on iOS → verify language names are announced
- [ ] T062 Test with TalkBack enabled on Android → verify accessibility
- [ ] T063 Test device language change while app is running → verify no automatic switch
- [ ] T064 Test clearing app data → verify language resets to device default
- [ ] T065 Test with slow device → verify language switch still <100ms
- [ ] T066 [P] Verify bundle size impact is <50KB for all translation files
- [ ] T067 [P] Create quickstart guide for adding new translations
- [ ] T068 [P] Document translation key naming conventions
- [ ] T069 Validate all acceptance scenarios from spec.md are passing
- [ ] T070 Final code review and cleanup of i18n service

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 and US2 can proceed in parallel (different files, but US2 needs US1's t() calls)
  - US3 can start after Foundational (independent extensibility work)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - Foundation of i18n ✅ MVP
- **User Story 2 (P1)**: Should start after US1 (needs t() calls in place) ✅ MVP
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Independent error handling and extensibility

### Within Each User Story

- Translation files (T007-T012) can all be created in parallel
- Testing tasks are sequential (one device/language at a time)
- Styling tasks can run in parallel with implementation

### Parallel Opportunities

- T001-T003 (Setup) can run in parallel
- T007-T012 (Translation files) can all run in parallel
- T035-T037 (Styling and accessibility) can run in parallel after component creation
- T045-T046 (US3 error handling) can run in parallel
- T055-T056, T066-T068 (Polish tasks) can run in parallel

---

## Parallel Example: User Story 1

```bash
# Setup phase (parallel):
Task T001: "Create TypeScript interfaces"
Task T002: "Add storage key constant"
Task T003: "Create locales directory"

# Foundational phase (parallel translation files):
Task T004-T006: "Core i18n service" (sequential)
Task T007: "Create en.json" (parallel)
Task T008: "Create ru.json" (parallel)
Task T009: "Create es.json" (parallel)
Task T010: "Create fr.json" (parallel)
Task T011: "Create de.json" (parallel)
Task T012: "Create ko.json" (parallel)
Task T013: "Create locales index" (after T007-T012)
Task T014: "Initialize i18n on startup"

# User Story 1 implementation:
Task T015-T018: "Locale detection and fallback" (sequential)
Task T019-T020: "Replace strings with t() calls" (sequential, after service)
Task T021-T025: "Testing" (can run in parallel on different devices)
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T014) - CRITICAL
3. Complete Phase 3: User Story 1 (T015-T025) - Auto-detection
4. Complete Phase 4: User Story 2 (T026-T044) - Manual switcher
5. **STOP and VALIDATE**: Test all 6 languages on both iOS and Android
6. Deploy/demo i18n feature

**MVP Deliverable**: Users see app in their device language, can manually change it via flag dropdown, and selection persists

### Incremental Delivery

1. Complete Setup + Foundational (T001-T014) → i18n service ready
2. Add User Story 1 (T015-T025) → Test independently → Deploy/Demo (Auto-detection ✅)
3. Add User Story 2 (T026-T044) → Test independently → Deploy/Demo (Manual switcher ✅) **MVP COMPLETE**
4. Add User Story 3 (T045-T054) → Test independently → Deploy/Demo (Extensibility ✅)
5. Polish (T055-T070) → Final validation → Production release

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T014)
   - Split translation files among team members (T007-T012 are all parallel)
2. Once Foundational is done:
   - Developer A: User Story 1 (T015-T025) - Auto-detection
   - Developer B: User Story 2 (T026-T044) - Can start component work
   - Developer C: User Story 3 (T045-T054) - Can start error handling
3. Polish tasks distributed across team (T055-T070)

---

## Testing with Different Locales

All user stories should be tested with device locale changes:

### iOS Simulator Locale Changes:
```
Settings → General → Language & Region → iPhone Language
- English
- Русский (Russian)
- Español (Spanish)
- Français (French)
- Deutsch (German)
- 한국어 (Korean)
- 日本語 (Japanese) - for fallback testing
```

### Android Emulator Locale Changes:
```
Settings → System → Languages & input → Languages
- English
- Русский (Russian)
- Español (Spanish)
- Français (French)
- Deutsch (German)
- 한국어 (Korean)
- 日本語 (Japanese) - for fallback testing
```

### Test Matrix:
- ✅ All 6 supported languages render correctly
- ✅ Unsupported language (Japanese) falls back to English
- ✅ "Monk Mode" never translates in any language
- ✅ Language persists after app restart
- ✅ Manual switcher works in all languages
- ✅ Missing translation keys show English text

---

## Translation Keys (MVP Scope - Home Menu)

All translation files must include these keys:

```json
{
  "__APP_NAME__": "Monk Mode",
  "home": {
    "welcome": "Welcome to meditation",
    "subtitle": "Find your inner peace",
    "startMeditation": "Start Meditation",
    "startTimer": "Start Timer",
    "lessons": "Lessons",
    "activity": "My Activity",
    "preset": "Presets"
  }
}
```

**Note**: `__APP_NAME__` is special - always returns "Monk Mode" regardless of language

---

## Notes

- [P] tasks = different files, no dependencies within their phase
- [Story] label maps task to specific user story for traceability (US1, US2, US3)
- Each user story should be independently completable and testable
- Test on real devices when possible (flag emojis may render differently)
- Use device locale settings for testing (not in-app simulators)
- All data stays local - fully offline-capable
- No new dependencies required (use built-in expo-localization)
- Translation files are static JSON bundled with app
- "Monk Mode" must never appear in translation files (hardcoded in code)

---

## Task Count Summary

- **Phase 1 (Setup)**: 3 tasks
- **Phase 2 (Foundational)**: 11 tasks  
- **Phase 3 (US1 - Auto-detection)**: 11 tasks
- **Phase 4 (US2 - Manual switcher)**: 19 tasks
- **Phase 5 (US3 - Extensibility)**: 10 tasks
- **Phase 6 (Polish)**: 16 tasks

**Total**: 70 tasks

**MVP Scope** (Recommended first delivery): Phase 1 + Phase 2 + Phase 3 + Phase 4 = 44 tasks

**Parallel Opportunities**: ~20 tasks marked [P] can run in parallel within their phases

**Independent User Stories**: All 3 user stories are independently testable after Foundational phase
