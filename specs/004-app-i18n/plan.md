# Implementation Plan: App Internationalization (i18n)

**Branch**: `004-app-i18n` | **Date**: 2025-12-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-app-i18n/spec.md`

## Summary

Implement internationalization system supporting 6 languages (English, Russian, Spanish, French, German, Korean) with automatic locale detection and manual language switcher UI. Users see flag icon on home menu; tapping opens dropdown to select language. Selected language persists across sessions. System is extensible for adding new languages and translation keys. MVP scope: home menu translations only, with "Monk Mode" app name always untranslated.

## Technical Context

**Language/Version**: TypeScript / React Native 0.81.5 with React 19.2.1  
**Primary Dependencies**: Expo SDK 54, Expo Router 6.0.15, expo-localization (built-in), @react-native-async-storage/async-storage 2.2.0  
**Storage**: AsyncStorage (key: `@monk_mode:language`), persists user's selected language code locally  
**Testing**: Manual testing on iOS and Android with different locale settings; test all 6 languages  
**Target Platform**: iOS 15+ and Android (Expo managed workflow)
**Project Type**: Mobile (React Native/Expo)  
**Performance Goals**: <100ms language switch, instant dropdown open/close, no visible lag on text update  
**Constraints**: Fully offline-capable, no translation APIs, static JSON translation files, minimal bundle size impact (<50KB for all translations)  
**Scale/Scope**: 6 languages in MVP, home menu only (~10-15 strings), extensible to full app (200-300 strings future)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ **Mobile-First, Offline-Ready**: Extends existing Expo mobile app; translations stored as static JSON files; no backend or API calls
- ✅ **Accessibility & Simplicity**: Flag icons with proper labels; simple dropdown UI; supports native screen readers in all languages
- ✅ **Test-First MVP Scope**: MVP limited to home menu (10-15 strings); manual testing on real devices with different locales; acceptance scenarios defined
- ✅ **Performance & Reliability**: Immediate language switching (<100ms); translations loaded synchronously; no network dependency
- ✅ **Privacy by Default**: No usage tracking; language preference stored locally only; no telemetry on language selection

**Gate: PASS** (no violations)

## Project Structure

### Documentation (this feature)

```text
specs/004-app-i18n/
├── plan.md              # This file (implementation strategy)
├── data-model.md        # Translation structure and language config
├── quickstart.md        # Developer guide for adding translations
├── checklists/
│   └── requirements.md  # Specification quality validation
└── spec.md              # Feature specification (user stories)
```

### Source Code (repository root)

```text
apps/mobile/
├── app/
│   ├── index.tsx                    # [MODIFY] Add language switcher UI
│   ├── services/
│   │   ├── i18n.ts                  # [NEW] Core i18n service
│   │   └── storage.ts               # [MODIFY] Add language storage key
│   ├── components/
│   │   └── LanguageSwitcher.tsx     # [NEW] Flag dropdown component
│   ├── locales/
│   │   ├── en.json                  # [NEW] English translations
│   │   ├── ru.json                  # [NEW] Russian translations
│   │   ├── es.json                  # [NEW] Spanish translations
│   │   ├── fr.json                  # [NEW] French translations
│   │   ├── de.json                  # [NEW] German translations
│   │   ├── ko.json                  # [NEW] Korean translations
│   │   └── index.ts                 # [NEW] Export all translations
│   └── types/
│       └── i18n.ts                   # [NEW] TypeScript interfaces
└── package.json                      # [EXISTING] No new dependencies needed
```

**Structure Decision**: Mobile React Native app structure. All i18n logic lives in `services/i18n.ts`. Translation files are static JSON in `locales/` directory. UI component is self-contained in `components/LanguageSwitcher.tsx`. Leverages existing Expo localization utilities and AsyncStorage. No backend changes needed - fully client-side feature.

## Phase 0: Research

Key research topics:

1. **React Native i18n Libraries**:
   - Decision: Use custom lightweight solution with Expo's `expo-localization`
   - Rationale: Existing libraries (react-i18next, react-native-localize) add significant bundle size; MVP scope is small enough for custom solution; full control over fallback logic
   - Alternatives considered: react-i18next (45KB, overkill for MVP), react-intl (70KB, too heavy)

2. **Translation File Format**:
   - Decision: JSON files with nested keys (e.g., `home.welcome`, `home.subtitle`)
   - Rationale: Native JSON parsing in React Native; easy for non-developers to edit; supports nested structure for organization
   - Format: `{ "home": { "welcome": "Welcome" } }`

3. **Locale Detection Strategy**:
   - Decision: Use `expo-localization.locale` for device language, extract primary code (en from en-US)
   - Rationale: Built into Expo SDK, no extra dependencies; handles regional variants automatically
   - Fallback: If locale not supported, default to 'en'

4. **Language Storage**:
   - Decision: Single key `@monk_mode:language` in AsyncStorage storing language code ('en', 'ru', etc.)
   - Rationale: Consistent with existing pattern (achievements, streaks); single atomic read/write; easy to clear
   - Size: <10 bytes per user

5. **Translation Loading**:
   - Decision: All translations bundled with app, loaded synchronously at startup
   - Rationale: Small size (<50KB total); no async loading complexity; always available offline; instant language switching
   - Alternatives rejected: Lazy loading (unnecessary complexity), remote translations (requires network)

6. **"Monk Mode" Exception**:
   - Decision: Special key `__APP_NAME__` that always returns "Monk Mode" regardless of language
   - Rationale: Clear intent; easy to identify in code; prevents accidental translation

## Phase 1: Design & Architecture

### Data Model

See `data-model.md` for complete entity definitions.

**Language Config** (static, code-defined):
```typescript
interface LanguageConfig {
  code: string;          // 'en', 'ru', 'es', 'fr', 'de', 'ko'
  name: string;          // 'English', 'Русский', 'Español', etc.
  nativeName: string;    // Name in the language itself
  flag: string;          // Unicode flag emoji
  enabled: boolean;      // For disabling languages temporarily
}
```

**Translation Data** (JSON files):
```typescript
type TranslationKeys = {
  __APP_NAME__: string;        // Always "Monk Mode"
  home: {
    welcome: string;
    subtitle: string;
    startMeditation: string;
    startTimer: string;
    lessons: string;
    activity: string;
    // ... other home menu strings
  };
};
```

**User Language Preference** (AsyncStorage):
```typescript
interface LanguagePreference {
  selectedLanguage: string;  // 'en' | 'ru' | 'es' | 'fr' | 'de' | 'ko'
}
```

### Service Architecture

**i18n.ts** exports:
- `initI18n()`: Initialize on app start, detect locale, load saved preference
- `getCurrentLanguage()`: Returns current language code
- `setLanguage(code)`: Change language and persist preference
- `t(key)`: Translate a key (e.g., `t('home.welcome')`) with fallback to English
- `getSupportedLanguages()`: Returns array of LanguageConfig

**Integration points**:
- `_layout.tsx` or `index.tsx`: Call `initI18n()` on app start
- `index.tsx`: Replace hardcoded strings with `t()` calls, add `<LanguageSwitcher />`
- All future screens: Use `t()` for all user-facing text

### Component Hierarchy

**index.tsx** (home menu modifications):
```
<SafeAreaView>
  <View>
    <Text>{"Monk Mode"}</Text>  {/* Never translated */}
    <LanguageSwitcher />         {/* NEW: Top-right corner */}
    <Text>{t('home.welcome')}</Text>
    <Pressable><Text>{t('home.startMeditation')}</Text></Pressable>
    {/* ... other buttons with t() */}
  </View>
</SafeAreaView>
```

**LanguageSwitcher**:
```
<Pressable onPress={toggleDropdown}>
  <Text>{currentLanguage.flag}</Text>
</Pressable>

{isOpen && (
  <Modal>
    {languages.map(lang => (
      <Pressable onPress={() => selectLanguage(lang.code)}>
        <Text>{lang.flag} {lang.nativeName}</Text>
      </Pressable>
    ))}
  </Modal>
)}
```

### Visual Design

**Flag Icon** (closed state):
- Size: 32x32pt
- Position: Top-right of home screen
- Shows current language flag
- Tap area: 44x44pt minimum

**Dropdown** (open state):
- Modal overlay with semi-transparent background
- Card-style dropdown below flag icon
- Each language: Flag + native name (e.g., "🇷🇺 Русский")
- Highlight current selection
- Close on tap outside or selection

**Language Order**:
1. English 🇬🇧
2. Russian 🇷🇺
3. Spanish 🇪🇸
4. French 🇫🇷
5. German 🇩🇪
6. Korean 🇰🇷

### Translation Keys (MVP - Home Menu Only)

| Key | English | Notes |
|-----|---------|-------|
| `__APP_NAME__` | Monk Mode | Never translated |
| `home.welcome` | Welcome to meditation | Greeting text |
| `home.subtitle` | Find your inner peace | Tagline |
| `home.startMeditation` | Start Meditation | Main CTA button |
| `home.startTimer` | Start Timer | Timer button |
| `home.lessons` | Lessons | Lessons nav button |
| `home.activity` | My Activity | Activity nav button |
| `home.preset` | Presets | Preset button |

## Phase 2: Implementation Phases

### P1: Core i18n Infrastructure (MVP)

**Files to create**:
1. `services/i18n.ts` - Core translation logic
2. `types/i18n.ts` - TypeScript interfaces
3. `locales/en.json` - English (base language)
4. `locales/ru.json` - Russian
5. `locales/es.json` - Spanish
6. `locales/fr.json` - French
7. `locales/de.json` - German
8. `locales/ko.json` - Korean
9. `locales/index.ts` - Export all translations

**Files to modify**:
1. `services/storage.ts` - Add language storage key
2. `_layout.tsx` - Initialize i18n on app start
3. `index.tsx` - Replace strings with `t()` calls

**Acceptance Test**: Change device locale to each supported language, verify home menu translates correctly

### P1: Language Switcher UI (MVP)

**Files to create**:
1. `components/LanguageSwitcher.tsx` - Flag dropdown component

**Files to modify**:
1. `index.tsx` - Add `<LanguageSwitcher />` component

**Acceptance Test**: Tap flag, select different languages, verify immediate translation and persistence

### P2: Extensibility & Error Handling

**Files to modify**:
1. `services/i18n.ts` - Add missing key fallback, malformed file handling
2. `locales/index.ts` - Auto-detect and register new language files

**Acceptance Test**: Add test language (Italian), remove translation key, verify graceful fallback

## Testing Strategy

**Manual Testing** (primary for MVP):
1. Test on iOS simulator with different device language settings
2. Test on Android emulator with different locales
3. Verify all 6 languages display correctly
4. Test language switcher UI interaction
5. Test persistence (close/reopen app)
6. Test unsupported language fallback (set device to Japanese)
7. Test missing translation key fallback
8. Test "Monk Mode" never translates

**Device Language Testing Matrix**:
- iOS: Settings → General → Language & Region → iPhone Language
- Android: Settings → System → Languages & input → Languages
- Test all 6 supported languages + 1 unsupported (e.g., Japanese)

## Performance Considerations

- All translations loaded at startup: ~50KB total, <10ms parse time
- Language switching: <100ms (AsyncStorage write + re-render)
- No network calls: fully offline
- No lazy loading complexity
- Dropdown renders max 6 items: no virtualization needed

## Migration & Rollback

**Data Migration**: None needed (new feature, new storage key)

**Rollback**: Remove language switcher from home menu; app defaults to English; translation data persists but unused

**Version Management**: Store version in each translation file for future schema changes

## Future Enhancements (Out of MVP Scope)

- Translate all app screens (currently only home menu)
- RTL language support (Arabic, Hebrew)
- Pluralization rules (e.g., "1 day" vs "2 days")
- Date/time localization (different formats per language)
- Number formatting (thousands separators)
- Translation key validation tool
- Crowdsourced translation platform
- A/B testing different translations

## Success Metrics

Implementation complete when:
- ✅ All P1 acceptance scenarios pass
- ✅ Language preference persists across app restarts
- ✅ All 6 languages display correctly on iOS and Android
- ✅ Language switching happens in <100ms
- ✅ Unsupported languages fallback to English
- ✅ "Monk Mode" never translates in any language
- ✅ Missing translation keys fallback to English
- ✅ Can add new language by only adding JSON file
- ✅ No crashes or blank screens in any language

See `spec.md` for complete success criteria.

## Notes

- Keep translation files flat and organized by screen/feature
- Use descriptive keys (not just numbers): `home.welcome` not `string_1`
- Always provide English fallback for new keys
- Test with real devices when possible (emoji rendering)
- Consider translation length (German is ~30% longer than English)
- Flag emojis may look different on iOS vs Android (both acceptable)
- "Monk Mode" is special cased and must never be in translation files
