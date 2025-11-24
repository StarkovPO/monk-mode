import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Preset() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      </View>
      <Text style={styles.title}>Choose Your Level</Text>
      <Pressable style={styles.card} onPress={() => router.push('/player')}>
        <Text style={styles.cardTitle}>Beginner</Text>
        <Text style={styles.cardSubtitle}>3 exercises • ~15 minutes</Text>
      </Pressable>
      <Pressable style={styles.card} onPress={() => router.push('/player')}>
        <Text style={styles.cardTitle}>Experienced</Text>
        <Text style={styles.cardSubtitle}>5 exercises • ~25 minutes</Text>
      </Pressable>
      <Pressable style={styles.card} onPress={() => router.push('/player')}>
        <Text style={styles.cardTitle}>Advanced</Text>
        <Text style={styles.cardSubtitle}>7 exercises • ~50 minutes</Text>
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
  title: {
    color: '#1A1A1A',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
    letterSpacing: -0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardTitle: {
    color: '#1A1A1A',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#666666',
    fontSize: 14,
  },
});
