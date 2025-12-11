import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import type { AchievementDefinition } from '../types/achievements';

interface AchievementCelebrationProps {
  achievement: AchievementDefinition;
  onDismiss: () => void;
  durationMs?: number;
}

export function AchievementCelebration({
  achievement,
  onDismiss,
  durationMs = 3000,
}: AchievementCelebrationProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: false }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: false, friction: 6 }),
    ]);
    animation.start();

    const timeout = setTimeout(() => dismiss(), durationMs);
    return () => {
      animation.stop();
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [achievement.id]);

  const dismiss = () => {
    Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: false }).start(() => {
      onDismiss();
    });
  };

  return (
    <Pressable style={styles.overlay} onPress={dismiss}>
      <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}>
        <View style={styles.emojiCircle}>
          <Text style={styles.emoji}>{achievement.emoji}</Text>
        </View>
        <Text style={styles.title}>{achievement.name} Unlocked!</Text>
        <Text style={styles.subtitle}>Celebrate this milestone and keep going.</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '90%',
    maxWidth: 380,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  emojiCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 36,
  },
  title: {
    fontSize: 20,
    color: '#1A1A1A',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
