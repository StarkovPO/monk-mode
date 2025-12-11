import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AchievementItem } from './AchievementItem';
import { AchievementDetail } from './AchievementDetail';
import { getAllAchievements } from '../services/achievements';
import type { AchievementWithDefinition } from '../types/achievements';

interface AchievementGridProps {
  refreshTrigger?: number;
}

export function AchievementGrid({ refreshTrigger = 0 }: AchievementGridProps) {
  const [achievements, setAchievements] = useState<AchievementWithDefinition[]>([]);
  const [selected, setSelected] = useState<AchievementWithDefinition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAchievements();
  }, [refreshTrigger]);

  const loadAchievements = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllAchievements();
      setAchievements(data);
    } catch (err) {
      console.error('Failed to load achievements:', err);
      setError('Could not load achievements');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Achievements</Text>
        {loading && <ActivityIndicator size="small" color="#1A1A1A" />}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {!loading && achievements.length === 0 && (
        <Text style={styles.emptyText}>No achievements found.</Text>
      )}

      <View style={styles.grid}>
        {achievements.map((achievement) => (
          <View key={achievement.id} style={styles.gridItem}>
            <AchievementItem
              achievement={achievement}
              size="medium"
              onPress={() => setSelected(achievement)}
            />
          </View>
        ))}
      </View>

      <AchievementDetail
        achievement={selected}
        visible={!!selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 13,
    marginBottom: 12,
  },
  emptyText: {
    color: '#999999',
    fontSize: 13,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '30%',
    alignItems: 'center',
  },
});
