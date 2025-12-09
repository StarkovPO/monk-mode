import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getCurrentStreaks } from './services/streaks';
import { Streaks } from './services/storage';

export default function Summary() {
  const router = useRouter();
  const { duration, completed, total } = useLocalSearchParams<{
    duration?: string;
    completed?: string;
    total?: string;
  }>();

  const [streaks, setStreaks] = useState<Streaks | null>(null);

  useEffect(() => {
    // Load streaks data
    getCurrentStreaks()
      .then(setStreaks)
      .catch((error) => {
        console.error('Failed to load streaks:', error);
      });
  }, []);

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const durationSec = duration ? parseInt(duration, 10) : 0;
  const completedCount = completed ? parseInt(completed, 10) : 0;
  const totalCount = total ? parseInt(total, 10) : 0;

  const durationDisplay = formatDuration(durationSec);
  const exercisesDisplay = `${completedCount}/${totalCount}`;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Well Done!</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{durationDisplay}</Text>
            <Text style={styles.statLabel}>Total Time</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{exercisesDisplay}</Text>
            <Text style={styles.statLabel}>Exercises</Text>
          </View>
        </View>
        <Text style={styles.message}>
          Thank you for taking time to meditate today.
        </Text>
        {streaks && streaks.currentStreak > 0 && (
          <View style={styles.streaksContainer}>
            <View style={styles.streakCard}>
              <Text style={styles.streakText}>
                🔥 {streaks.currentStreak} day streak
              </Text>
            </View>
            <View style={styles.streakDetails}>
              <Text style={styles.streakDetail}>
                Longest streak: {streaks.longestStreak} days
              </Text>
              <Text style={styles.streakDetail}>
                Total days: {streaks.totalDays}
              </Text>
            </View>
          </View>
        )}
        {streaks && streaks.currentStreak === 0 && (
          <View style={styles.streakCard}>
            <Text style={styles.streakText}>
              🎯 Start your meditation streak today!
            </Text>
          </View>
        )}
      </View>
      <Pressable style={styles.buttonSecondary} onPress={() => router.push('/activity')}>
        <Text style={styles.buttonTextSecondary}>My Activity</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#1A1A1A',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 48,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 48,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#1A1A1A',
    fontSize: 40,
    fontWeight: '700',
  },
  statLabel: {
    color: '#666666',
    fontSize: 14,
    marginTop: 8,
  },
  message: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 24,
  },
  streaksContainer: {
    marginBottom: 16,
  },
  streakCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
  },
  streakText: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  streakDetails: {
    paddingHorizontal: 8,
  },
  streakDetail: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
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
