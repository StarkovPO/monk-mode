import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Summary() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Great Job! 🎉</Text>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>15:00</Text>
          <Text style={styles.statLabel}>Total Time</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>3/3</Text>
          <Text style={styles.statLabel}>Exercises</Text>
        </View>
      </View>
      <Text style={styles.gratitude}>
        Thank you for taking time to meditate today.
      </Text>
      <View style={styles.streaks}>
        <Text style={styles.streakText}>🔥 3 day streak</Text>
      </View>
      <Pressable style={styles.button} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#F8FAFC',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#22C55E',
    fontSize: 36,
    fontWeight: '800',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 4,
  },
  gratitude: {
    color: '#94A3B8',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  streaks: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  streakText: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#22C55E',
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
