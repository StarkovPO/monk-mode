import { TranslationKeys, LanguageCode } from '../types/i18n';

// Import all translation files
import en from './en.json';
import ru from './ru.json';
import es from './es.json';
import fr from './fr.json';
import de from './de.json';
import ko from './ko.json';

/**
 * All translations mapped by language code
 */
const translations: Record<LanguageCode, TranslationKeys> = {
  en: en as TranslationKeys,
  ru: ru as TranslationKeys,
  es: es as TranslationKeys,
  fr: fr as TranslationKeys,
  de: de as TranslationKeys,
  ko: ko as TranslationKeys,
};

export default translations;
