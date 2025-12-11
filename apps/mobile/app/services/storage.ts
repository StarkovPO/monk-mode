import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const KEYS = {
  STREAKS: '@monk_mode:streaks',
  LAST_SESSION: '@monk_mode:last_session',
  SOUND_ENABLED: '@monk_mode:sound_enabled',
  ACHIEVEMENTS: '@monk_mode:achievements',
  LANGUAGE: '@monk_mode:language',
};
export const ACHIEVEMENTS_KEY = KEYS.ACHIEVEMENTS;
export const LANGUAGE_KEY = KEYS.LANGUAGE;

// Types
export interface Streaks {
  lastCreditedDate: string; // YYYY-MM-DD format
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
}

export interface SessionData {
  id: string;
  presetId: string;
  startTime: string; // ISO string
  endTime: string | null;
  completedExercises: number;
  totalExercises: number;
  elapsedSec: number;
}

// Default values
const DEFAULT_STREAKS: Streaks = {
  lastCreditedDate: '',
  currentStreak: 0,
  longestStreak: 0,
  totalDays: 0,
};

/**
 * Get streaks data from storage
 */
export async function getStreaks(): Promise<Streaks> {
  try {
    const value = await AsyncStorage.getItem(KEYS.STREAKS);
    if (value) {
      return JSON.parse(value);
    }
    return DEFAULT_STREAKS;
  } catch (error) {
    console.error('Error getting streaks:', error);
    return DEFAULT_STREAKS;
  }
}

/**
 * Save streaks data to storage
 */
export async function saveStreaks(streaks: Streaks): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.STREAKS, JSON.stringify(streaks));
  } catch (error) {
    console.error('Error saving streaks:', error);
    throw error;
  }
}

/**
 * Get last session data
 */
export async function getLastSession(): Promise<SessionData | null> {
  try {
    const value = await AsyncStorage.getItem(KEYS.LAST_SESSION);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    console.error('Error getting last session:', error);
    return null;
  }
}

/**
 * Save session data
 */
export async function saveSession(session: SessionData): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.LAST_SESSION, JSON.stringify(session));
  } catch (error) {
    console.error('Error saving session:', error);
    throw error;
  }
}

/**
 * Get sound enabled preference
 */
export async function getSoundEnabled(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(KEYS.SOUND_ENABLED);
    if (value === null) {
      return true; // Default to enabled
    }
    return value === 'true';
  } catch (error) {
    console.error('Error getting sound preference:', error);
    return true;
  }
}

/**
 * Save sound enabled preference
 */
export async function setSoundEnabled(enabled: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.SOUND_ENABLED, enabled ? 'true' : 'false');
  } catch (error) {
    console.error('Error saving sound preference:', error);
    throw error;
  }
}

/**
 * Clear all app data
 */
export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      KEYS.STREAKS,
      KEYS.LAST_SESSION,
      KEYS.SOUND_ENABLED,
      KEYS.ACHIEVEMENTS,
      KEYS.LANGUAGE,
    ]);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
}
