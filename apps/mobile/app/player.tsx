import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Player() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meditation Session</Text>
      <Text style={styles.exerciseName}>Breath Awareness</Text>
      <Text style={styles.timer}>00:00</Text>
      <Text style={styles.reminder}>Focus on your natural breath...</Text>
      <View style={styles.controls}>
        <Pressable style={styles.controlButton}>
          <Text style={styles.buttonText}>Pause</Text>
        </Pressable>
        <Pressable style={styles.controlButton}>
          <Text style={styles.buttonText}>Skip</Text>
        </Pressable>
      </View>
      <Pressable style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </Pressable>
      <Pressable style={styles.finishButton} onPress={() => router.push('/summary')}>
        <Text style={styles.buttonText}>Finish</Text>
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
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
  },
  exerciseName: {
    color: '#94A3B8',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  timer: {
    color: '#F8FAFC',
    fontSize: 64,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
  },
  reminder: {
    color: '#94A3B8',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 48,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  controlButton: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    minWidth: 100,
  },
  cancelButton: {
    backgroundColor: '#7F1D1D',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  finishButton: {
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
