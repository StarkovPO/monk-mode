import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { getAchievementProgress } from '../services/achievements';
import type {
  AchievementProgress,
  AchievementWithDefinition,
} from '../types/achievements';

interface AchievementDetailProps {
  achievement: AchievementWithDefinition | null;
  visible: boolean;
  onClose: () => void;
}

export function AchievementDetail({ achievement, visible, onClose }: AchievementDetailProps) {
  const [progress, setProgress] = useState<AchievementProgress | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProgress = async () => {
      if (!achievement || !visible) {
        setProgress(null);
        return;
      }
      setLoading(true);
      try {
        const result = await getAchievementProgress(achievement.id);
        if (result) {
          setProgress(result);
        }
      } catch (error) {
        console.error('Failed to load achievement progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [achievement, visible]);

  if (!achievement) {
    return null;
  }

  const unlockedDate = achievement.unlockedAt
    ? new Date(achievement.unlockedAt).toLocaleDateString()
    : null;

  const renderProgressText = () => {
    if (achievement.unlocked) {
      return unlockedDate ? `Unlocked on ${unlockedDate}` : 'Unlocked';
    }

    if (!progress) {
      return loading ? 'Loading progress...' : null;
    }

    let unit = 'steps';
    if (achievement.unlockType === 'session_count') {
      unit = progress.required === 1 ? 'session' : 'sessions';
    } else if (achievement.unlockType === 'streak_days') {
      unit = progress.required === 1 ? 'day' : 'days';
    } else if (achievement.unlockType === 'lesson_complete') {
      unit = progress.required === 1 ? 'lesson' : 'lessons';
    }

    return `${progress.current}/${progress.required} ${unit}`;
  };

  const unlockCriteriaCopy = () => {
    switch (achievement.unlockType) {
      case 'session_count':
        return `Complete ${achievement.unlockValue} meditation ${
          Number(achievement.unlockValue) === 1 ? 'session' : 'sessions'
        }.`;
      case 'streak_days':
        return `Maintain a streak of ${achievement.unlockValue} ${
          Number(achievement.unlockValue) === 1 ? 'day' : 'days'
        }.`;
      case 'lesson_complete':
        return 'Finish the basic meditation lessons.';
      default:
        return '';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={(event) => event.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.emoji}>{achievement.emoji}</Text>
            <Text style={styles.name}>{achievement.name}</Text>
            <Text style={styles.description}>{achievement.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Unlock criteria</Text>
            <Text style={styles.sectionText}>{unlockCriteriaCopy()}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>{achievement.unlocked ? 'Status' : 'Progress'}</Text>
            <Text style={styles.progressText}>{renderProgressText()}</Text>
            {achievement.unlocked && <Text style={styles.celebrateText}>🎉 Great work!</Text>}
          </View>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 42,
    marginBottom: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
    textAlign: 'center',
  },
  section: {
    marginTop: 12,
  },
  sectionLabel: {
    color: '#999999',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  sectionText: {
    color: '#1A1A1A',
    fontSize: 14,
    lineHeight: 20,
  },
  progressText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '700',
  },
  celebrateText: {
    color: '#666666',
    fontSize: 13,
    marginTop: 6,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#1A1A1A',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
