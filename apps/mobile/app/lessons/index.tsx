import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';

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
  return (
    <ScrollView style={styles.container}>
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
    backgroundColor: '#0F172A',
    padding: 24,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  lessonCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  lessonTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  lessonSummary: {
    color: '#94A3B8',
    fontSize: 14,
  },
});
