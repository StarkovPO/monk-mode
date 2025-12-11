# Feature Specification: App Internationalization (i18n)

**Feature Branch**: `004-app-i18n`  
**Created**: 2025-12-11  
**Status**: In progress  
**Input**: User description: "Support internationalization with English, Russian, Spanish, French, German, and Korean languages. Auto-detect phone locale with flag-based language switcher on home menu."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Automatic Language Detection (Priority: P1)

When a user first opens the app, the system automatically detects their device language and displays the app in that language if it's supported (English, Russian, Spanish, French, German, or Korean). If the device language is not supported, the app defaults to English. The app name "Monk Mode" always remains untranslated.

**Why this priority**: This is the foundation of internationalization - users immediately see the app in their preferred language without any manual setup. This is the most critical feature as it provides instant value to international users.

**Independent Test**: Install the app on devices with different locale settings (Russian, Spanish, Korean, etc.) and verify the home menu text is translated correctly while "Monk Mode" remains in English. Test with an unsupported language (e.g., Japanese) and verify it defaults to English.

**Acceptance Scenarios**:

1. **Given** device locale is set to Russian, **When** user opens the app for the first time, **Then** home menu displays in Russian (except "Monk Mode" which stays in English)
2. **Given** device locale is set to Spanish, **When** user opens the app, **Then** home menu displays in Spanish with "Monk Mode" untranslated
3. **Given** device locale is set to Korean, **When** user opens the app, **Then** home menu displays in Korean with "Monk Mode" untranslated
4. **Given** device locale is set to Japanese (unsupported), **When** user opens the app, **Then** home menu displays in English as fallback
5. **Given** device locale is English, **When** user opens the app, **Then** home menu displays in English

---

### User Story 2 - Language Switcher UI (Priority: P1)

Users see a small flag icon on the home menu representing their current language. When they tap the flag, a dropdown menu appears showing flags for all available languages. Tapping a different flag switches the app to that language immediately. The selected language is saved and persists across app restarts.

**Why this priority**: This is part of the MVP as it provides the UI for language selection. Without this, users cannot manually change their language if the auto-detection chooses incorrectly or they want a different language than their device default.

**Independent Test**: Open the app, tap the flag icon, verify all 6 language flags appear in the dropdown. Select different languages and verify the home menu text changes immediately. Restart the app and verify the selected language persists.

**Acceptance Scenarios**:

1. **Given** app is in English, **When** user taps the flag icon, **Then** dropdown shows 6 flag options (🇬🇧🇷🇺🇪🇸🇫🇷🇩🇪🇰🇷)
2. **Given** dropdown is open, **When** user taps the Russian flag, **Then** home menu immediately translates to Russian and dropdown closes
3. **Given** user has selected Spanish, **When** user closes and reopens the app, **Then** app still displays in Spanish
4. **Given** user is viewing the dropdown, **When** user taps outside the dropdown, **Then** dropdown closes without changing language
5. **Given** app is in French, **When** user taps the current language flag in dropdown, **Then** dropdown closes without changes

---

### User Story 3 - Translation Management (Priority: P2)

The translation system is structured so that adding new languages or updating existing translations is straightforward. New translation keys can be added easily for future features without breaking existing functionality. Developers can add new languages by providing translation files without modifying core code.

**Why this priority**: While not immediately visible to users, this ensures the i18n system is maintainable and scalable. This is P2 because it should be built correctly from the start to avoid technical debt, but the app can function without perfect extensibility in MVP.

**Independent Test**: Add a new test language (e.g., Italian) by creating a translation file and verify it appears in the language switcher without code changes. Add a new translation key for a hypothetical new feature and verify all existing languages handle the missing key gracefully.

**Acceptance Scenarios**:

1. **Given** developer adds a new language file, **When** app restarts, **Then** new language appears in dropdown automatically
2. **Given** a translation key is missing for one language, **When** that language is selected, **Then** app shows fallback English text for that key
3. **Given** developer adds a new translation key to all language files, **When** user switches languages, **Then** new translated text appears correctly in all languages
4. **Given** a translation file is malformed, **When** app loads, **Then** app gracefully falls back to English without crashing

### Edge Cases

- **Device language change during app use**: If user changes their device language while app is running, the app should not automatically switch (wait until next app launch) to avoid disrupting current session
- **Missing translation keys**: If a translation key is missing for the selected language, fallback to English for that specific text
- **RTL languages**: Current MVP only supports LTR (left-to-right) languages. RTL support (Arabic, Hebrew) is out of scope
- **Region-specific variants**: English defaults to generic English (not US/UK/AU specific), Spanish defaults to generic Spanish (not regional dialects)
- **Flag representation**: Use standard Unicode flag emojis which may render differently on iOS vs Android
- **Very long translations**: Some languages (German) have longer words - UI should handle text wrapping gracefully
- **Special characters**: All languages must support their native character sets (Cyrillic, Korean characters, accented characters)
- **App name translation**: "Monk Mode" must NEVER be translated in any language, even if it seems awkward
- **Empty translations**: If an entire language file is empty or missing, fallback to English completely
- **Invalid locale codes**: If device returns unrecognized locale, default to English safely

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST detect device locale on first app launch and set app language to matching supported language
- **FR-002**: System MUST default to English if device locale does not match any supported language (en, ru, es, fr, de, ko)
- **FR-003**: System MUST display a flag icon on the home menu representing the current active language
- **FR-004**: Users MUST be able to tap the flag icon to open a dropdown menu showing all 6 available language options
- **FR-005**: System MUST display appropriate flag emoji for each language: 🇬🇧 English, 🇷🇺 Russian, 🇪🇸 Spanish, 🇫🇷 French, 🇩🇪 German, 🇰🇷 Korean
- **FR-006**: System MUST immediately update the home menu text when user selects a different language from the dropdown
- **FR-007**: System MUST persist the user's selected language preference across app restarts
- **FR-008**: System MUST never translate the app name "Monk Mode" regardless of selected language
- **FR-009**: System MUST translate only the home menu text in the MVP (scope limited for testing)
- **FR-010**: System MUST provide fallback to English text if a translation key is missing for the selected language
- **FR-011**: System MUST close the language dropdown when user taps outside of it without changing language
- **FR-012**: System MUST be structured to allow easy addition of new languages by adding translation files
- **FR-013**: System MUST be structured to allow easy addition of new translation keys for future features
- **FR-014**: System MUST handle locale codes with region variants (e.g., en-US, en-GB) by matching the primary language code (en)

### Key Entities

- **Language Configuration**: Represents a supported language with properties: language code (e.g., "en", "ru"), language name (e.g., "English", "Русский"), flag emoji, and enabled/disabled status
- **Translation String**: A key-value pair where the key is a translation identifier (e.g., "home.welcome") and the value is the localized text for a specific language
- **User Language Preference**: Stores the user's selected language code, persisted locally on the device

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users with supported device locales see the app in their language on first launch without any manual configuration
- **SC-002**: Users can switch between all 6 languages and see changes reflected immediately (within 100ms)
- **SC-003**: Selected language persists across app restarts with 100% reliability
- **SC-004**: All home menu text is correctly translated in all 6 languages with "Monk Mode" remaining untranslated
- **SC-005**: Users with unsupported device languages see the app in English without errors or blank screens
- **SC-006**: Language dropdown opens and closes smoothly with no visual glitches or lag
- **SC-007**: Adding a new language requires only creating a translation file, no code changes to core functionality
- **SC-008**: Missing translation keys fallback to English gracefully without crashes or empty UI elements

### Assumptions

- Users have smartphones with standard locale settings
- Flag emojis are supported by the target platform (iOS 13+, Android 10+)
- Home menu has limited text scope suitable for MVP translation testing
- Users understand flag icons as language selectors (common UX pattern)
- Translation quality is provided by external translators (not validated by system)
- App does not need real-time language switching (changing language while deeply navigated requires reloading)
