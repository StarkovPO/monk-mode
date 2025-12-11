import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { AchievementWithDefinition } from '../types/achievements';

type AchievementItemSize = 'small' | 'medium' | 'large';

interface AchievementItemProps {
  achievement: AchievementWithDefinition;
  size?: AchievementItemSize;
  onPress?: () => void;
}

const SIZE_STYLES: Record<AchievementItemSize, { container: number; emoji: number }> = {
  small: { container: 72, emoji: 28 },
  medium: { container: 88, emoji: 36 },
  large: { container: 104, emoji: 44 },
};

export function AchievementItem({ achievement, size = 'medium', onPress }: AchievementItemProps) {
  const isUnlocked = achievement.unlocked;
  const dimensions = SIZE_STYLES[size];

  return (
    <Pressable
      accessible
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityLabel={`${achievement.name} achievement, ${isUnlocked ? 'unlocked' : 'locked'}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { width: dimensions.container, height: dimensions.container },
        pressed && onPress ? styles.pressed : null,
      ]}
    >
      <View style={[styles.emojiCircle, !isUnlocked && styles.lockedCircle]}>
        <Text
          style={[
            styles.emoji,
            { fontSize: dimensions.emoji },
            isUnlocked ? styles.emojiUnlocked : styles.emojiLocked,
          ]}
        >
          {achievement.emoji}
        </Text>
      </View>
      <Text
        numberOfLines={2}
        style={[styles.name, isUnlocked ? styles.nameUnlocked : styles.nameLocked]}
      >
        {achievement.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  emojiCircle: {
    width: '100%',
    height: '70%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 8,
  },
  lockedCircle: {
    borderStyle: 'dashed',
  },
  emoji: {
    textAlign: 'center',
  },
  emojiUnlocked: {
    opacity: 1,
  },
  emojiLocked: {
    opacity: 0.35,
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
  },
  nameUnlocked: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  nameLocked: {
    color: '#9A9A9A',
    fontWeight: '500',
  },
});
