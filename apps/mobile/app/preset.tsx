import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Preset() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Preset</Text>
      <Pressable style={styles.button} onPress={() => router.push('/player')}>
        <Text style={styles.buttonText}>Beginner (3 exercises)</Text>
        <Text style={styles.subtitle}>~15 minutes</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.push('/player')}>
        <Text style={styles.buttonText}>Experienced (5 exercises)</Text>
        <Text style={styles.subtitle}>~25 minutes</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.push('/player')}>
        <Text style={styles.buttonText}>Advanced (7 exercises)</Text>
        <Text style={styles.subtitle}>~50 minutes</Text>
      </Pressable>
    </View>
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
  button: {
    backgroundColor: '#1F2937',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonText: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 4,
  },
});
