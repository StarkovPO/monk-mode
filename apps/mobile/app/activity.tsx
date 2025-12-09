import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { getCurrentStreaks } from './services/streaks';
import type { Streaks } from './services/storage';
import { DebugPanel } from './components/DebugPanel';

export default function Activity() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streaks, setStreaks] = useState<Streaks | null>(null);

  useEffect(() => {
    loadStreakData();
  }, []);

  const loadStreakData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCurrentStreaks();
      setStreaks(data);
    } catch (err) {
      console.error('Error loading streak data:', err);
      setError('Failed to load streak data');
    } finally {
      setLoading(false);
    }
  };

  const formatDays = (count: number): string => {
    return count === 1 ? '1 day' : `${count} days`;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1A1A1A" />
          <Text style={styles.loadingText}>Loading your stats...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={loadStreakData}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
        
        <View style={styles.bottomActions}>
          <Pressable 
            onPress={() => router.back()} 
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed
            ]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const isEmptyState = streaks && streaks.totalDays === 0;
  const currentStreakCount = streaks?.currentStreak || 0;
  const streakText = currentStreakCount === 1 ? 'day' : 'days';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {isEmptyState ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateEmoji}>🧘</Text>
            <Text style={styles.emptyStateTitle}>Start Your Journey</Text>
            <Text style={styles.emptyStateText}>
              Complete your first meditation session to start building your streak!
            </Text>
          </View>
        ) : (
          <View style={styles.statsContainer}>
            {/* Current Streak - Large number on top */}
            <View style={styles.currentStreakSection}>
              <Text style={styles.currentStreakNumber}>{currentStreakCount}</Text>
              <Text style={styles.currentStreakText}>{streakText}</Text>
            </View>

            {/* Longest Streak Row */}
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Longest meditation day streak</Text>
              <Text style={styles.statValue}>{streaks?.longestStreak || 0} {streaks?.longestStreak === 1 ? 'day' : 'days'}</Text>
            </View>

            {/* Total Sessions Row */}
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total sessions</Text>
              <Text style={styles.statValue}>{streaks?.totalDays || 0}</Text>
            </View>

            {/* Achievements Section */}
            <View style={styles.achievementsSection}>
              <Text style={styles.achievementsTitle}>Achievements</Text>
              <View style={styles.achievementsRow}>
                <View style={styles.achievementItem}>
                  <View style={styles.achievementCircle} />
                  <Text style={styles.achievementName}>First Step</Text>
                </View>
                <View style={styles.achievementItem}>
                  <View style={styles.achievementCircle} />
                  <Text style={styles.achievementName}>Weekly Warrior</Text>
                </View>
                <View style={styles.achievementItem}>
                  <View style={styles.achievementCircle} />
                  <Text style={styles.achievementName}>Mindful Month</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.bottomActions}>
        <Pressable 
          onPress={() => router.push('/')} 
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backText}>← Back Home</Text>
        </Pressable>
      </View>

      {/* Debug Panel - Only in Development */}
      {__DEV__ && <DebugPanel onDataChanged={loadStreakData} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    color: '#999999',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  retryText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    paddingTop: 40,
  },
  // Current Streak - Large number on top
  currentStreakSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  currentStreakNumber: {
    color: '#1A1A1A',
    fontSize: 96,
    fontWeight: '300',
    lineHeight: 100,
    letterSpacing: -3,
  },
  currentStreakText: {
    color: '#999999',
    fontSize: 24,
    fontWeight: '300',
    marginTop: 8,
  },
  // Stat Rows (Longest Streak, Total Sessions)
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  statLabel: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '400',
  },
  statValue: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '500',
  },
  // Achievements Section
  achievementsSection: {
    marginTop: 60,
  },
  achievementsTitle: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 24,
  },
  achievementsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achievementItem: {
    alignItems: 'center',
  },
  achievementCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D0D0D0',
    marginBottom: 12,
  },
  achievementName: {
    color: '#999999',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    maxWidth: 90,
  },
  // Empty State
  emptyState: {
    paddingTop: 80,
    alignItems: 'center',
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: 24,
  },
  emptyStateTitle: {
    color: '#1A1A1A',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  emptyStateText: {
    color: '#999999',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 32,
  },
  // Bottom Actions
  bottomActions: {
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 160,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButtonPressed: {
    backgroundColor: '#F0F0F0',
    opacity: 0.8,
  },
  backText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
  },
});
