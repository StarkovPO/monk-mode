import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { t } from './services/i18n';

export default function Preset() {
  const router = useRouter();
  
  const handlePresetSelect = (presetId: string) => {
    router.push(`/player?preset=${presetId}`);
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose Your Level</Text>
        <Pressable style={styles.card} onPress={() => handlePresetSelect('beginner')}>
          <Text style={styles.cardTitle}>Beginner</Text>
          <Text style={styles.cardSubtitle}>3 exercises • ~15 minutes</Text>
        </Pressable>
        <Pressable style={styles.card} onPress={() => handlePresetSelect('experienced')}>
          <Text style={styles.cardTitle}>Experienced</Text>
          <Text style={styles.cardSubtitle}>5 exercises • ~25 minutes</Text>
        </Pressable>
        <Pressable style={styles.card} onPress={() => handlePresetSelect('advanced')}>
          <Text style={styles.cardTitle}>Advanced</Text>
          <Text style={styles.cardSubtitle}>7 exercises • ~50 minutes</Text>
        </Pressable>
      </View>
      
      <View style={styles.bottomActions}>
        <Pressable 
          onPress={() => router.back()} 
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backText}>{t('navigation.backToHome')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    color: '#1A1A1A',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
    letterSpacing: -0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardTitle: {
    color: '#1A1A1A',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#666666',
    fontSize: 14,
  },
  bottomActions: {
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 160,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButtonPressed: {
    backgroundColor: '#F0F0F0',
    opacity: 0.8,
  },
  backText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
  },
});
