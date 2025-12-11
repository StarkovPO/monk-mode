// TypeScript interfaces for i18n system

/**
 * Supported language codes
 */
export type LanguageCode = 'en' | 'ru' | 'es' | 'fr' | 'de' | 'ko';

/**
 * Language configuration defining a supported language
 */
export interface LanguageConfig {
  code: LanguageCode;
  name: string;           // English name (e.g., "Russian")
  nativeName: string;     // Native name (e.g., "Русский")
  flag: string;           // Unicode flag emoji
  enabled: boolean;       // Whether language is currently enabled
}

/**
 * Translation keys structure for home menu (MVP scope)
 */
export interface TranslationKeys {
  __APP_NAME__: string;   // Special key: always returns "Monk Mode"
  home: {
    welcome: string;
    subtitle: string;
    startMeditation: string;
    startTimer: string;
    lessons: string;
    activity: string;
    preset: string;
  };
}

/**
 * User's language preference stored in AsyncStorage
 */
export interface LanguagePreference {
  selectedLanguage: LanguageCode;
}

/**
 * Translation data structure (JSON files)
 */
export type TranslationData = TranslationKeys;
