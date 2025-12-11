import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { setLanguage, getSupportedLanguages, getCurrentLanguageConfig } from '../services/i18n';
import { LanguageCode } from '../types/i18n';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(getCurrentLanguageConfig());
  const languages = getSupportedLanguages();

  const handleLanguageSelect = async (code: LanguageCode) => {
    try {
      await setLanguage(code);
      setCurrentLang(getCurrentLanguageConfig());
      setIsOpen(false);
      // Force re-render of parent by updating state
      // The parent will re-render and fetch new translations
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Flag icon button */}
      <Pressable
        onPress={toggleDropdown}
        style={styles.flagButton}
        accessibilityLabel={`Current language: ${currentLang.nativeName}`}
        accessibilityRole="button"
        accessibilityHint="Tap to change language"
      >
        <Text style={styles.flagIcon}>{currentLang.flag}</Text>
      </Pressable>

      {/* Dropdown modal */}
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.dropdown}>
                <Text style={styles.dropdownTitle}>Select Language</Text>
                {languages.map((lang) => (
                  <Pressable
                    key={lang.code}
                    onPress={() => handleLanguageSelect(lang.code)}
                    style={[
                      styles.languageOption,
                      lang.code === currentLang.code && styles.languageOptionSelected,
                    ]}
                    accessibilityLabel={`Switch to ${lang.nativeName}`}
                    accessibilityRole="button"
                  >
                    <Text style={styles.languageFlag}>{lang.flag}</Text>
                    <Text
                      style={[
                        styles.languageName,
                        lang.code === currentLang.code && styles.languageNameSelected,
                      ]}
                    >
                      {lang.nativeName}
                    </Text>
                    {lang.code === currentLang.code && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </Pressable>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 1000,
  },
  flagButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flagIcon: {
    fontSize: 28,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 70,
    paddingRight: 16,
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  dropdownTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 4,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  languageOptionSelected: {
    backgroundColor: '#F5F5F5',
  },
  languageFlag: {
    fontSize: 24,
  },
  languageName: {
    fontSize: 16,
    color: '#1A1A1A',
    flex: 1,
  },
  languageNameSelected: {
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 18,
    color: '#1A1A1A',
    fontWeight: '700',
  },
});
