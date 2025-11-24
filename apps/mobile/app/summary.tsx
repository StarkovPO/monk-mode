import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Summary() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Well Done!</Text>
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
        <Text style={styles.message}>
          Thank you for taking time to meditate today.
        </Text>
        <View style={styles.streakCard}>
          <Text style={styles.streakText}>🔥 3 day streak</Text>
        </View>
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
  streakCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  streakText: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
