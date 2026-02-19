import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { lessons } from '../data/lessons';
import { t } from '../services/i18n';

export default function Lessons() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.wrapper} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Meditation Lessons</Text>
        {lessons.map((lesson) => (
          <Link key={lesson.id} href={`/lessons/${lesson.id}`} asChild>
            <Pressable style={styles.lessonCard}>
              <Text style={styles.lessonTitle}>{t(lesson.titleKey)}</Text>
              <Text style={styles.lessonSummary}>{t(lesson.summaryKey)}</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
      
      <View style={styles.bottomActions}>
        <Pressable 
          onPress={() => router.back()} 
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backText}>← Back to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    color: '#1A1A1A',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  lessonTitle: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  lessonSummary: {
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
