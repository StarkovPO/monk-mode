import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { checkAndUnlockAchievements, isLessonCompleted } from '../services/achievements';
import { AchievementCelebration } from '../components/AchievementCelebration';
import type { AchievementDefinition } from '../types/achievements';
import { getLessonById } from '../data/lessons';

export default function LessonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = getLessonById(String(id)) || { title: `Lesson ${id}`, summary: '', content: 'Content coming soon...', category: 'foundation' as const };
  const [completed, setCompleted] = useState(false);
  const [celebration, setCelebration] = useState<AchievementDefinition | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      isLessonCompleted(String(id))
        .then(setCompleted)
        .catch((error) => console.error('Failed to load lesson status:', error));
    }
  }, [id]);

  const handleCompleteLesson = async () => {
    if (!id || saving) return;
    try {
      setSaving(true);
      setCompleted(true);
      const unlocks = await checkAndUnlockAchievements({
        type: 'lesson_complete',
        metadata: { lessonId: String(id) },
      });
      if (unlocks.length > 0) {
        setCelebration(unlocks[0]);
      }
    } catch (error) {
      console.error('Failed to record lesson completion:', error);
      setCompleted(false);
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.wrapper} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.content}>{lesson.content}</Text>
      </ScrollView>
      
      <View style={styles.bottomActions}>
        <Pressable
          onPress={handleCompleteLesson}
          style={({ pressed }) => [
            styles.completeButton,
            pressed && styles.completeButtonPressed,
            completed && styles.completeButtonDone,
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          disabled={completed || saving}
        >
          <Text style={[styles.completeText, completed && styles.completeTextDone]}>
            {completed ? 'Completed' : saving ? 'Saving...' : 'Mark as Complete'}
          </Text>
        </Pressable>
        <Pressable 
          onPress={() => router.back()} 
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backText}>← Back to Lessons</Text>
        </Pressable>
      </View>
      {celebration && (
        <AchievementCelebration achievement={celebration} onDismiss={() => setCelebration(null)} />
      )}
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
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    marginTop: 8,
    letterSpacing: -0.5,
  },
  content: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 26,
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
  completeButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 180,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  completeButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  completeButtonDone: {
    backgroundColor: '#F0F0F0',
  },
  completeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  completeTextDone: {
    color: '#666666',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 180,
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
