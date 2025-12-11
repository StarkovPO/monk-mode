import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { t, getCurrentLanguage } from './services/i18n';
import LanguageSwitcher from './components/LanguageSwitcher';

export default function Home() {
  // Force re-render when language changes
  const [, forceUpdate] = useState(0);
  
  useEffect(() => {
    // Set up interval to check for language changes
    const interval = setInterval(() => {
      forceUpdate(prev => prev + 1);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <View style={styles.container}>
      <LanguageSwitcher />
      <Text style={styles.title}>Monk Mode</Text>
      <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
      <Pressable style={styles.button} onPress={() => {}}>
        <Link href="/preset" asChild>
          <Pressable style={styles.buttonInner}>
            <Text style={styles.buttonText}>{t('home.startMeditation')}</Text>
          </Pressable>
        </Link>
      </Pressable>
      <Pressable style={[styles.button, styles.buttonSecondary]}>
        <Link href="/lessons" asChild>
          <Pressable style={styles.buttonInner}>
            <Text style={styles.buttonTextSecondary}>{t('home.lessons')}</Text>
          </Pressable>
        </Link>
      </Pressable>
      <Pressable style={[styles.button, styles.buttonSecondary]}>
        <Link href="/activity" asChild>
          <Pressable style={styles.buttonInner}>
            <Text style={styles.buttonTextSecondary}>{t('home.activity')}</Text>
          </Pressable>
        </Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 32,
    justifyContent: 'center',
  },
  title: {
    color: '#1A1A1A',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#666666',
    fontSize: 16,
    marginBottom: 48,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  buttonInner: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    width: '100%',
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonTextSecondary: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
