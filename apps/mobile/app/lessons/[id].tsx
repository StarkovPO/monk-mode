import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const lessons: Record<string, { title: string; content: string }> = {
  '1': {
    title: 'Introduction to Meditation',
    content: 'Meditation is a practice of focused attention and awareness. Begin with just 5 minutes a day, finding a quiet space where you can sit comfortably. The goal is not to empty your mind, but to observe your thoughts without judgment.\n\nKey principles:\n• Start small and build gradually\n• Be consistent with your practice\n• Let go of expectations\n• Notice when your mind wanders and gently return to focus',
  },
  '2': {
    title: 'Breath Awareness',
    content: 'Focus on the natural rhythm of your breath. Feel the air entering and leaving your nostrils, the rise and fall of your chest and belly. When your mind wanders, simply notice and return to the breath.\n\nTechnique:\n• Sit comfortably with your spine straight\n• Close your eyes or lower your gaze\n• Breathe naturally, without forcing\n• Count breaths if it helps maintain focus',
  },
  '3': {
    title: 'Body Scan',
    content: 'Systematically direct your attention through different parts of your body, releasing tension as you go. This practice cultivates body awareness and deep relaxation.\n\nSteps:\n• Start at the top of your head\n• Move slowly down through each body part\n• Notice sensations without trying to change them\n• Release tension with each exhale',
  },
};

export default function LessonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessons[id] || { title: `Lesson ${id}`, content: 'Content coming soon...' };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.content}>{lesson.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 24,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  content: {
    color: '#94A3B8',
    fontSize: 16,
    lineHeight: 24,
  },
});
