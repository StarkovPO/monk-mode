import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monk Mode</Text>
      <Text style={styles.subtitle}>Find peace through meditation</Text>
      <Link href="/preset" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Start Session</Text>
        </Pressable>
      </Link>
      <Link href="/lessons" asChild>
        <Pressable style={[styles.button, styles.buttonSecondary]}>
          <Text style={styles.buttonTextSecondary}>Browse Lessons</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 32,
    justifyContent: 'center',
  },
  title: {
    color: '#1A1A1A',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#666666',
    fontSize: 16,
    marginBottom: 48,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
