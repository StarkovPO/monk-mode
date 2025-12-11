import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { LanguageCode, LanguageConfig, TranslationKeys } from '../types/i18n';
import { LANGUAGE_KEY } from './storage';
import translationsImport from '../locales';

const translations: Record<LanguageCode, TranslationKeys> = translationsImport;

/**
 * Supported languages configuration
 */
const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    enabled: true,
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    enabled: true,
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    enabled: true,
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    enabled: true,
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    enabled: true,
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    enabled: true,
  },
];

// Default language
const DEFAULT_LANGUAGE: LanguageCode = 'en';

// Current language state
let currentLanguage: LanguageCode = DEFAULT_LANGUAGE;
let currentTranslations: TranslationKeys = translations[DEFAULT_LANGUAGE];

/**
 * Initialize i18n system
 * Detects device locale and loads saved language preference
 */
export async function initI18n(): Promise<void> {
  try {
    // Check if user has a saved language preference
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    
    if (savedLanguage && isValidLanguageCode(savedLanguage)) {
      // Use saved preference
      currentLanguage = savedLanguage as LanguageCode;
      currentTranslations = translations[currentLanguage];
    } else {
      // Auto-detect from device locale
      const locales = Localization.getLocales();
      const deviceLocale = locales[0]?.languageTag || 'en-US'; // e.g., "en-US", "ru-RU"
      const languageCode = extractPrimaryLanguageCode(deviceLocale);
      
      // Check if detected language is supported
      if (isValidLanguageCode(languageCode)) {
        currentLanguage = languageCode as LanguageCode;
        currentTranslations = translations[currentLanguage];
        // Save auto-detected language
        await setLanguage(currentLanguage);
      } else {
        // Fallback to English
        currentLanguage = DEFAULT_LANGUAGE;
        currentTranslations = translations[DEFAULT_LANGUAGE];
        await setLanguage(DEFAULT_LANGUAGE);
      }
    }
  } catch (error) {
    console.error('Error initializing i18n:', error);
    // Fallback to default language
    currentLanguage = DEFAULT_LANGUAGE;
    currentTranslations = translations[DEFAULT_LANGUAGE];
  }
}

/**
 * Extract primary language code from locale string
 * Examples: "en-US" -> "en", "ru-RU" -> "ru"
 */
function extractPrimaryLanguageCode(locale: string): string {
  return locale.split('-')[0].toLowerCase();
}

/**
 * Check if a language code is valid and supported
 */
function isValidLanguageCode(code: string): boolean {
  return SUPPORTED_LANGUAGES.some(lang => lang.code === code && lang.enabled);
}

/**
 * Get current language code
 */
export function getCurrentLanguage(): LanguageCode {
  return currentLanguage;
}

/**
 * Set language and persist preference
 */
export async function setLanguage(code: LanguageCode): Promise<void> {
  try {
    if (!isValidLanguageCode(code)) {
      console.warn(`Language "${code}" not supported, falling back to English`);
      code = DEFAULT_LANGUAGE;
    }
    
    currentLanguage = code;
    currentTranslations = translations[code];
    
    // Persist to storage
    await AsyncStorage.setItem(LANGUAGE_KEY, code);
  } catch (error) {
    console.error('Error setting language:', error);
    throw error;
  }
}

/**
 * Translate a key with fallback to English
 * @param key Translation key (e.g., "home.welcome")
 * @returns Translated string
 */
export function t(key: string): string {
  // Special handling for app name - always return "Monk Mode"
  if (key === '__APP_NAME__') {
    return 'Monk Mode';
  }
  
  try {
    // Split nested keys (e.g., "home.welcome" -> ["home", "welcome"])
    const keys = key.split('.');
    let value: any = currentTranslations;
    
    // Navigate through nested object
    for (const k of keys) {
      value = value[k];
      if (value === undefined) {
        throw new Error(`Translation key "${key}" not found`);
      }
    }
    
    if (typeof value !== 'string') {
      throw new Error(`Translation key "${key}" is not a string`);
    }
    
    return value;
  } catch (error) {
    console.warn(`Translation missing for key "${key}", using English fallback`);
    
    // Fallback to English
    try {
      const keys = key.split('.');
      let value: any = translations['en'];
      
      for (const k of keys) {
        value = value[k];
        if (value === undefined) {
          return key; // Return key itself if even English is missing
        }
      }
      
      return typeof value === 'string' ? value : key;
    } catch {
      return key; // Last resort: return the key itself
    }
  }
}

/**
 * Get all supported languages
 */
export function getSupportedLanguages(): LanguageConfig[] {
  return SUPPORTED_LANGUAGES.filter(lang => lang.enabled);
}

/**
 * Get current language configuration
 */
export function getCurrentLanguageConfig(): LanguageConfig {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage) || SUPPORTED_LANGUAGES[0];
}
