import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Player() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.exerciseName}>Breath Awareness</Text>
        <Text style={styles.timer}>00:00</Text>
        <Text style={styles.instruction}>Focus on your natural breath...</Text>
      </View>
      <View style={styles.controls}>
        <Pressable style={styles.controlButton}>
          <Text style={styles.controlText}>Pause</Text>
        </Pressable>
        <Pressable style={styles.controlButton}>
          <Text style={styles.controlText}>Skip</Text>
        </Pressable>
      </View>
      <Pressable style={styles.finishButton} onPress={() => router.push('/summary')}>
        <Text style={styles.finishText}>Finish Session</Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseName: {
    color: '#666666',
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  timer: {
    color: '#1A1A1A',
    fontSize: 72,
    fontWeight: '300',
    marginBottom: 24,
    textAlign: 'center',
  },
  instruction: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 24,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  controlButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginHorizontal: 6,
  },
  controlText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
  },
  finishButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  finishText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
