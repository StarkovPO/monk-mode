import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monk Mode</Text>
      <Link href="/preset" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Start Session</Text>
        </Pressable>
      </Link>
      <Link href="/lessons" asChild>
        <Pressable style={[styles.button, styles.buttonSecondary]}>
          <Text style={styles.buttonText}>Browse Lessons</Text>
        </Pressable>
      </Link>
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
  button: {
    backgroundColor: '#22C55E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: '#1F2937',
  },
  buttonText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
