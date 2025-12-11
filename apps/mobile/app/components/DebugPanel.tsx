import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetAchievements } from '../services/achievements';

// Use the same storage key as the app
const STORAGE_KEY = '@monk_mode:streaks';

interface DebugPanelProps {
  onDataChanged?: () => void;
}

export function DebugPanel({ onDataChanged }: DebugPanelProps) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const setStreakData = async (current: number, longest: number, total: number) => {
    try {
      setLoading(true);
      
      // Use today's date in YYYY-MM-DD format
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;
      
      const data = {
        lastCreditedDate: current > 0 ? todayStr : '',
        currentStreak: current,
        longestStreak: longest,
        totalDays: total,
      };
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log('✅ Test data set:', data);
      
      // Small delay to ensure AsyncStorage write completes
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (onDataChanged) {
        await onDataChanged();
      }
      
      setLoading(false);
    } catch (error) {
      console.error('❌ Failed to set test data:', error);
      setLoading(false);
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      console.log('✅ All data cleared');
      if (onDataChanged) onDataChanged();
    } catch (error) {
      console.error('❌ Failed to clear data:', error);
    }
  };

  const viewCurrent = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('📊 Current streaks:', JSON.parse(data || '{}'));
    } catch (error) {
      console.error('❌ Failed to view data:', error);
    }
  };

  const clearAchievements = async () => {
    try {
      await resetAchievements();
      console.log('✅ Achievements reset');
      if (onDataChanged) onDataChanged();
    } catch (error) {
      console.error('❌ Failed to reset achievements:', error);
    }
  };

  if (!visible) {
    return (
      <Pressable
        style={styles.toggleButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.toggleText}>🛠️ Debug</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🛠️ Debug Panel</Text>
        <Pressable onPress={() => setVisible(false)}>
          <Text style={styles.closeButton}>✕</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Test Scenarios</Text>
        
        {loading && (
          <View style={styles.loadingBanner}>
            <Text style={styles.loadingText}>⏳ Updating...</Text>
          </View>
        )}

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={() => setStreakData(0, 0, 0)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>🆕 New User (0 sessions)</Text>
        </Pressable>

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={() => setStreakData(1, 1, 1)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>1️⃣ First Day (1 day)</Text>
        </Pressable>

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={() => setStreakData(7, 7, 7)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>🔥 Week Streak (7 days)</Text>
        </Pressable>

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={() => setStreakData(3, 10, 25)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>💔 Broken Streak (3 current, 10 best)</Text>
        </Pressable>

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={() => setStreakData(30, 30, 35)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>🌟 Month Streak (30 days)</Text>
        </Pressable>

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={() => setStreakData(123, 365, 500)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>🏆 Long Streak (123/365 days)</Text>
        </Pressable>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Actions</Text>

        <Pressable
          style={[styles.button, styles.buttonSecondary]}
          onPress={viewCurrent}
        >
          <Text style={styles.buttonTextSecondary}>👁️ View Current (Console)</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonSecondary]}
          onPress={clearAchievements}
        >
          <Text style={styles.buttonTextSecondary}>🔄 Reset Achievements</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonDanger]}
          onPress={clearAll}
        >
          <Text style={styles.buttonTextDanger}>🗑️ Clear All Data</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#1A1A1A',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  toggleText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  closeButton: {
    fontSize: 24,
    color: '#666666',
    paddingHorizontal: 8,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  buttonTextSecondary: {
    color: '#1A1A1A',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonDanger: {
    backgroundColor: '#FEE',
    borderWidth: 1,
    borderColor: '#FCC',
  },
  buttonTextDanger: {
    color: '#E53E3E',
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
  },
  loadingBanner: {
    backgroundColor: '#FFF3CD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  loadingText: {
    color: '#856404',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
