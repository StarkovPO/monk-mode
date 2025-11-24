import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';

const lessons = [
  { id: '1', title: 'Introduction to Meditation', summary: 'Learn the basics' },
  { id: '2', title: 'Breath Awareness', summary: 'Focus on your breathing' },
  { id: '3', title: 'Body Scan', summary: 'Progressive relaxation' },
  { id: '4', title: 'Loving Kindness', summary: 'Cultivate compassion' },
  { id: '5', title: 'Mindful Walking', summary: 'Meditation in motion' },
  { id: '6', title: 'Visualization', summary: 'Use your imagination' },
  { id: '7', title: 'Sound Meditation', summary: 'Listen deeply' },
  { id: '8', title: 'Open Awareness', summary: 'Pure presence' },
];

export default function Lessons() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      </View>
      <Text style={styles.title}>Meditation Lessons</Text>
      {lessons.map((lesson) => (
        <Link key={lesson.id} href={`/lessons/${lesson.id}`} asChild>
          <Pressable style={styles.lessonCard}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonSummary}>{lesson.summary}</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    paddingVertical: 8,
  },
  backText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '500',
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
});
