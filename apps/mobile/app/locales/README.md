# Translation Files (i18n)

This directory contains JSON translation files for all supported languages in the Monk Mode app.

## File Structure

Each language has its own JSON file named with its ISO 639-1 language code:

- `en.json` - English (default/fallback)
- `ru.json` - Russian (Русский)
- `es.json` - Spanish (Español)
- `fr.json` - French (Français)
- `de.json` - German (Deutsch)
- `ko.json` - Korean (한국어)

## Translation File Format

Each translation file must follow this structure:

```json
{
  "version": 1,
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

### Key Naming Conventions

- **version**: Schema version number for future migrations (currently `1`)
- **__APP_NAME__**: Special key that always returns "Monk Mode" - **never translate this value**
- **Nested keys**: Use dot notation for access (`home.welcome`, `home.subtitle`)
- **Key names**: Use camelCase for consistency (`startMeditation` not `start_meditation`)
- **Descriptive**: Keys should be self-explanatory (`welcome` not `text1`)

### Translation Guidelines

1. **App Name**: The value for `__APP_NAME__` must always be `"Monk Mode"` in all languages
2. **Length**: Be mindful of text length - German translations are typically 30% longer
3. **Context**: Ensure translations fit the UI context (button text should be concise)
4. **Punctuation**: Maintain consistent punctuation across languages
5. **Special Characters**: Use native character sets (Cyrillic, accents, Korean characters)

## Adding a New Language

To add support for a new language:

1. Create a new JSON file with the ISO 639-1 language code (e.g., `it.json` for Italian)
2. Copy the structure from `en.json`
3. Translate all values (keep keys and `__APP_NAME__` unchanged)
4. Add the language to `index.ts`:

```typescript
import it from './it.json';

const translations: Record<LanguageCode, TranslationKeys> = {
  // ... existing languages
  it: it as TranslationKeys,
};
```

5. Update the `LanguageCode` type in `../types/i18n.ts`:

```typescript
export type LanguageCode = 'en' | 'ru' | 'es' | 'fr' | 'de' | 'ko' | 'it';
```

6. Add the language config in `../services/i18n.ts`:

```typescript
{
  code: 'it',
  name: 'Italian',
  nativeName: 'Italiano',
  flag: '🇮🇹',
  enabled: true,
}
```

## Adding New Translation Keys

When adding new features that require translations:

1. Add the key to `en.json` first (base language)
2. Add the same key structure to all other language files
3. If a key is missing in a language, the system will automatically fallback to English

Example:

```json
{
  "version": 1,
  "__APP_NAME__": "Monk Mode",
  "home": {
    // ... existing keys
    "settings": "Settings"  // New key
  }
}
```

Add this new key to all 6 language files with appropriate translations.

## Testing Translations

1. **Device Locale**: Change your device/simulator language settings
2. **Manual Switcher**: Use the flag icon on the home menu
3. **Missing Keys**: Remove a translation to test fallback behavior
4. **Special Characters**: Verify Cyrillic, Korean, and accented characters display correctly

## Fallback Behavior

The i18n system has robust fallback logic:

1. **Primary**: Uses the selected language translation
2. **Fallback**: If key is missing, uses English translation
3. **Last Resort**: If even English is missing, shows the key itself

## Do NOT Translate

These elements should **never** be translated:

- The app name "Monk Mode"
- Translation keys (the left side of key-value pairs)
- The `version` field
- Technical identifiers

## Version History

- **v1** (2025-12-11): Initial MVP with 6 languages, home menu only
- **v2** (2026-02-20): Added exercises, presets, and lessons translations

## Current Translation Scope

**Fully Translated** (English & Russian):
- ✅ Home menu (welcome, buttons)
- ✅ Navigation buttons (Back to Home, Back to Lessons, etc.)
- ✅ Presets (3 presets: Beginner, Experienced, Advanced)
- ✅ Exercises (14 exercises with stages, descriptions, reminders)
- ✅ Lessons (12 lessons: titles, summaries, full content, and action buttons)
- ✅ Activity page (stats, empty state, loading/error states)
- ✅ Summary page (navigation buttons)

**Translation Keys by Section**:

### Navigation (`navigation.*`)
- `backToHome` - "← Back to Home"
- `backToLessons` - "← Back to Lessons"
- `back` - "← Back"
- `backHome` - "← Back Home"

### Activity Page (`activity.*`)
- `loading` - Loading message
- `error` - Error message
- `retry` - Retry button
- `emptyStateTitle` - Empty state title
- `emptyStateText` - Empty state description
- `currentStreak` - Current streak label
- `day` / `days` - Singular/plural day labels
- `longestStreak` - Longest streak label
- `totalSessions` - Total sessions label

### Lessons (`lessons.*`)
- `markAsComplete` - Mark as Complete button
- `completed` - Completed state
- `saving` - Saving state
- Individual lesson content (anapanasati, posture, mudras, stage1-6, agitation, lethargy, glossary)

### Summary Page (`summary.*`)
- `backToHome` - Back to Home button
- `myActivity` - My Activity button

**Languages with Complete Coverage**:
- English (en) - ✅ Complete (all sections)
- Russian (ru) - ✅ Complete (all sections)
- Spanish (es) - ⚠️ Needs: navigation, activity, lessons buttons, summary
- French (fr) - ⚠️ Needs: navigation, activity, lessons buttons, summary
- German (de) - ⚠️ Needs: navigation, activity, lessons buttons, summary
- Korean (ko) - ⚠️ Needs: navigation, activity, lessons buttons, summary

## Future Expansions

Potential future translation scopes:

- Settings screen
- Meditation timer UI (pause, resume, skip buttons)
- Achievement descriptions and names
- Error messages and alerts
- Onboarding/tutorial screens
