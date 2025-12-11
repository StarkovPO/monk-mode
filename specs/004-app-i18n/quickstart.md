# Quickstart Guide: i18n System

**Feature**: App Internationalization (i18n)  
**Audience**: Developers working with the translation system  
**Last Updated**: 2025-12-11

## Overview

The Monk Mode app supports 6 languages out of the box: English, Russian, Spanish, French, German, and Korean. The system automatically detects the user's device language and provides a manual switcher for changing languages.

## Quick Reference

### Using Translations in Components

```typescript
import { t } from './services/i18n';

// In your component
<Text>{t('home.welcome')}</Text>
<Text>{t('home.subtitle')}</Text>
```

### Getting Current Language

```typescript
import { getCurrentLanguage, getCurrentLanguageConfig } from './services/i18n';

const langCode = getCurrentLanguage(); // Returns: 'en' | 'ru' | 'es' | 'fr' | 'de' | 'ko'
const langConfig = getCurrentLanguageConfig(); // Returns full config with flag, name, etc.
```

### Changing Language Programmatically

```typescript
import { setLanguage } from './services/i18n';

await setLanguage('ru'); // Switch to Russian
```

## Adding a New Language (Example: Italian)

Follow these steps to add Italian language support:

### Step 1: Create Translation File

Create `/apps/mobile/app/locales/it.json`:

```json
{
  "version": 1,
  "__APP_NAME__": "Monk Mode",
  "home": {
    "welcome": "Benvenuto alla meditazione",
    "subtitle": "Trova la tua pace interiore",
    "startMeditation": "Inizia Meditazione",
    "startTimer": "Avvia Timer",
    "lessons": "Lezioni",
    "activity": "La Mia Attività",
    "preset": "Preimpostazioni"
  }
}
```

### Step 2: Update TypeScript Types

In `/apps/mobile/app/types/i18n.ts`:

```typescript
// Add 'it' to the LanguageCode type
export type LanguageCode = 'en' | 'ru' | 'es' | 'fr' | 'de' | 'ko' | 'it';
```

### Step 3: Update Locales Index

In `/apps/mobile/app/locales/index.ts`:

```typescript
import { TranslationKeys, LanguageCode } from '../types/i18n';

// Import all translation files
import en from './en.json';
import ru from './ru.json';
import es from './es.json';
import fr from './fr.json';
import de from './de.json';
import ko from './ko.json';
import it from './it.json'; // ADD THIS LINE

const translations: Record<LanguageCode, TranslationKeys> = {
  en: en as TranslationKeys,
  ru: ru as TranslationKeys,
  es: es as TranslationKeys,
  fr: fr as TranslationKeys,
  de: de as TranslationKeys,
  ko: ko as TranslationKeys,
  it: it as TranslationKeys, // ADD THIS LINE
};

export default translations;
```

### Step 4: Add Language Config

In `/apps/mobile/app/services/i18n.ts`:

```typescript
const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  // ... existing languages
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    enabled: true,
  },
];
```

### Step 5: Test

1. Restart the app
2. Open the language switcher (flag icon)
3. Italian should now appear in the dropdown
4. Select Italian and verify all home menu text translates

## Adding New Translation Keys

When adding new screens or features that need translations:

### Step 1: Define Keys in English

Add to `/apps/mobile/app/locales/en.json`:

```json
{
  "version": 1,
  "__APP_NAME__": "Monk Mode",
  "home": {
    // ... existing keys
  },
  "settings": {
    "title": "Settings",
    "notifications": "Notifications",
    "sound": "Sound",
    "language": "Language"
  }
}
```

### Step 2: Add to All Languages

Repeat for `ru.json`, `es.json`, `fr.json`, `de.json`, `ko.json`:

```json
// ru.json
{
  "settings": {
    "title": "Настройки",
    "notifications": "Уведомления",
    "sound": "Звук",
    "language": "Язык"
  }
}
```

### Step 3: Update TypeScript Types (Optional but Recommended)

In `/apps/mobile/app/types/i18n.ts`:

```typescript
export interface TranslationKeys {
  __APP_NAME__: string;
  home: {
    welcome: string;
    // ... existing keys
  };
  settings: {        // ADD THIS
    title: string;
    notifications: string;
    sound: string;
    language: string;
  };
}
```

### Step 4: Use in Components

```typescript
import { t } from './services/i18n';

export default function Settings() {
  return (
    <View>
      <Text>{t('settings.title')}</Text>
      <Text>{t('settings.notifications')}</Text>
      <Text>{t('settings.sound')}</Text>
    </View>
  );
}
```

## Testing Different Languages

### iOS Simulator

1. Open Settings app
2. Go to General → Language & Region
3. Change iPhone Language to test language
4. Restart the app
5. Verify translations appear

### Android Emulator

1. Open Settings app
2. Go to System → Languages & input → Languages
3. Add and select test language
4. Restart the app
5. Verify translations appear

### Manual Switcher

1. Open the app
2. Tap the flag icon (top-right of home screen)
3. Select different languages from dropdown
4. Verify immediate translation
5. Close and reopen app
6. Verify selected language persists

## Common Tasks

### Testing Fallback Behavior

To test the English fallback for missing keys:

1. Open `/apps/mobile/app/locales/ru.json`
2. Remove a translation key (e.g., `welcome`)
3. Switch app to Russian
4. The removed key should display in English

### Testing Unsupported Language

1. Change device language to unsupported language (e.g., Japanese)
2. Restart app
3. App should display in English (fallback)

### Force Language Refresh

If translations don't update immediately:

1. Close the app completely
2. Reopen
3. Or add this debug button:

```typescript
import { initI18n } from './services/i18n';

<Pressable onPress={() => initI18n()}>
  <Text>Reload Translations</Text>
</Pressable>
```

## Troubleshooting

### Translations Don't Update

**Problem**: Changed translation files but text doesn't update

**Solutions**:
1. Fully restart the app (not just hot reload)
2. Check if you're calling `t()` correctly
3. Verify translation key exists in JSON file
4. Check console for "Translation missing" warnings

### Wrong Language Displayed

**Problem**: App shows wrong language on first launch

**Solutions**:
1. Check device language settings
2. Verify language code is supported (en, ru, es, fr, de, ko)
3. Check AsyncStorage for saved preference: `@monk_mode:language`
4. Clear app data to test fresh install

### Flag Emojis Look Different

**Problem**: Flag emojis render differently on iOS vs Android

**Solution**: This is expected behavior. Unicode flag emojis are rendered by the OS and may look different across platforms. Both are acceptable.

### TypeScript Errors

**Problem**: TypeScript complains about translation keys

**Solutions**:
1. Ensure `TranslationKeys` interface matches JSON structure
2. Add type assertion: `t('key' as any)` as temporary fix
3. Update type definitions in `/apps/mobile/app/types/i18n.ts`

## Performance Tips

1. **Avoid excessive `t()` calls**: Cache translated strings if used multiple times
2. **Use constants**: For repeated translations, store in variables
3. **Lazy loading**: Current implementation loads all at startup (fine for <50KB)

```typescript
// Good: Cache once
const welcomeText = t('home.welcome');
return (
  <View>
    <Text>{welcomeText}</Text>
    <Text>{welcomeText}</Text>
  </View>
);

// Less optimal: Multiple lookups
return (
  <View>
    <Text>{t('home.welcome')}</Text>
    <Text>{t('home.welcome')}</Text>
  </View>
);
```

## Best Practices

1. **Always provide English translation**: It's the fallback for all languages
2. **Test with real devices**: Emulators may not reflect actual character rendering
3. **Consider text length**: German words are ~30% longer than English
4. **Use native names**: Show "Русский" not "Russian" in language picker
5. **Never translate app name**: "Monk Mode" stays in English always
6. **Document new keys**: Update README.md when adding translation keys
7. **Version your changes**: Increment version number for breaking changes

## API Reference

### Core Functions

#### `initI18n(): Promise<void>`
Initialize i18n system. Called once on app startup.

#### `t(key: string): string`
Translate a key with English fallback.

```typescript
t('home.welcome')        // "Welcome to meditation"
t('home.invalid')        // "home.invalid" (key itself if missing)
t('__APP_NAME__')        // "Monk Mode" (always)
```

#### `getCurrentLanguage(): LanguageCode`
Get current language code.

```typescript
const lang = getCurrentLanguage(); // 'en' | 'ru' | 'es' | 'fr' | 'de' | 'ko'
```

#### `setLanguage(code: LanguageCode): Promise<void>`
Change app language and persist preference.

```typescript
await setLanguage('ru');
```

#### `getSupportedLanguages(): LanguageConfig[]`
Get all enabled languages.

```typescript
const languages = getSupportedLanguages();
// Returns array of { code, name, nativeName, flag, enabled }
```

#### `getCurrentLanguageConfig(): LanguageConfig`
Get full config for current language.

```typescript
const config = getCurrentLanguageConfig();
console.log(config.flag);       // '🇬🇧'
console.log(config.nativeName); // 'English'
```

## Resources

- **Translation Files**: `/apps/mobile/app/locales/*.json`
- **i18n Service**: `/apps/mobile/app/services/i18n.ts`
- **Type Definitions**: `/apps/mobile/app/types/i18n.ts`
- **Language Switcher**: `/apps/mobile/app/components/LanguageSwitcher.tsx`
- **Specification**: `/specs/004-app-i18n/spec.md`
- **Implementation Plan**: `/specs/004-app-i18n/plan.md`

## Support

For questions or issues:
1. Check this quickstart guide
2. Review `/apps/mobile/app/locales/README.md`
3. Check the implementation plan for design decisions
4. Test with debug panel for language-specific issues
