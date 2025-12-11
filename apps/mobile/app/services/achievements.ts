import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACHIEVEMENTS_KEY, getStreaks } from './storage';
import type { Streaks } from './storage';
import type {
  Achievement,
  AchievementDefinition,
  AchievementEvent,
  AchievementProgress,
  AchievementsData,
  AchievementWithDefinition,
} from '../types/achievements';

const ACHIEVEMENTS_VERSION = 1;
const BASIC_LESSON_IDS = ['1', '2', '3', '4', '5', '6'];

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  {
    id: 'first_step',
    name: 'First Step',
    emoji: '🧘',
    description: 'Complete your first meditation',
    unlockType: 'session_count',
    unlockValue: 1,
  },
  {
    id: 'weekly_warrior',
    name: 'Weekly Warrior',
    emoji: '🔥',
    description: 'Meditate 7 days in a row',
    unlockType: 'streak_days',
    unlockValue: 7,
  },
  {
    id: 'mindful_month',
    name: 'Mindful Month',
    emoji: '🌟',
    description: 'Reach a 30-day streak',
    unlockType: 'streak_days',
    unlockValue: 30,
  },
  {
    id: 'committed',
    name: 'Committed',
    emoji: '💪',
    description: 'Complete 30 meditation sessions',
    unlockType: 'session_count',
    unlockValue: 30,
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    emoji: '🎯',
    description: 'Complete 100 meditation sessions',
    unlockType: 'session_count',
    unlockValue: 100,
  },
  {
    id: 'student',
    name: 'Student of Stillness',
    emoji: '📚',
    description: 'Complete all basic meditation lessons',
    unlockType: 'lesson_complete',
    unlockValue: 'all_basics',
  },
];

function buildDefaultData(): AchievementsData {
  return {
    achievements: ACHIEVEMENT_DEFINITIONS.map((definition) => ({
      id: definition.id,
      unlocked: false,
    })),
    completedLessons: [],
    version: ACHIEVEMENTS_VERSION,
  };
}

function mergeWithDefaults(raw?: Partial<AchievementsData>): AchievementsData {
  if (!raw) {
    return buildDefaultData();
  }

  const storedAchievements = new Map<string, Achievement>();
  (raw.achievements || []).forEach((achievement) => {
    storedAchievements.set(achievement.id, achievement);
  });

  const mergedAchievements: Achievement[] = ACHIEVEMENT_DEFINITIONS.map((definition) => {
    const stored = storedAchievements.get(definition.id);
    if (stored?.unlocked) {
      return { id: definition.id, unlocked: true, unlockedAt: stored.unlockedAt };
    }
    return { id: definition.id, unlocked: false };
  });

  const completedLessons = raw.completedLessons || [];

  return {
    achievements: mergedAchievements,
    completedLessons,
    version: ACHIEVEMENTS_VERSION,
  };
}

export async function getAchievementsData(): Promise<AchievementsData> {
  try {
    const storedValue = await AsyncStorage.getItem(ACHIEVEMENTS_KEY);
    if (!storedValue) {
      return buildDefaultData();
    }
    const parsed = JSON.parse(storedValue) as Partial<AchievementsData>;
    return mergeWithDefaults(parsed);
  } catch (error) {
    console.error('Error reading achievements data:', error);
    return buildDefaultData();
  }
}

export async function saveAchievementsData(data: AchievementsData): Promise<void> {
  try {
    await AsyncStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving achievements data:', error);
    throw error;
  }
}

export async function getAllAchievements(): Promise<AchievementWithDefinition[]> {
  const data = await getAchievementsData();
  return ACHIEVEMENT_DEFINITIONS.map((definition) => {
    const stored = data.achievements.find((achievement) => achievement.id === definition.id);
    return {
      ...definition,
      unlocked: stored?.unlocked || false,
      unlockedAt: stored?.unlockedAt,
    };
  });
}

export async function isAchievementUnlocked(id: string): Promise<boolean> {
  const data = await getAchievementsData();
  return data.achievements.some((achievement) => achievement.id === id && achievement.unlocked);
}

function shouldUnlockAchievement(
  definition: AchievementDefinition,
  streaks: Streaks,
  completedLessons: Set<string>,
): boolean {
  switch (definition.unlockType) {
    case 'session_count':
      return streaks.totalDays >= Number(definition.unlockValue);
    case 'streak_days':
      return streaks.currentStreak >= Number(definition.unlockValue);
    case 'lesson_complete': {
      if (definition.unlockValue === 'all_basics') {
        return BASIC_LESSON_IDS.every((lessonId) => completedLessons.has(lessonId));
      }
      return completedLessons.has(String(definition.unlockValue));
    }
    default:
      return false;
  }
}

export async function checkAndUnlockAchievements(
  event: AchievementEvent,
): Promise<AchievementDefinition[]> {
  const streaks = await getStreaks();
  const streakSnapshot: Streaks = { ...streaks };
  if (event.type === 'session_complete' || event.type === 'streak_update') {
    streakSnapshot.currentStreak = Math.max(streakSnapshot.currentStreak, event.metadata.currentStreak);
    if (typeof event.metadata.totalSessions === 'number') {
      streakSnapshot.totalDays = Math.max(streakSnapshot.totalDays, event.metadata.totalSessions);
    }
  }
  const data = await getAchievementsData();
  const completedLessons = new Set(data.completedLessons || []);
  let lessonsUpdated = false;

  if (event.type === 'lesson_complete') {
    const lessonId = String(event.metadata.lessonId);
    if (!completedLessons.has(lessonId)) {
      completedLessons.add(lessonId);
      lessonsUpdated = true;
    }
  }

  const now = new Date().toISOString();
  const newlyUnlocked: AchievementDefinition[] = [];
  const achievementMap = new Map<string, Achievement>();
  data.achievements.forEach((achievement) => achievementMap.set(achievement.id, achievement));

  const updatedAchievements: Achievement[] = ACHIEVEMENT_DEFINITIONS.map((definition) => {
    const stored = achievementMap.get(definition.id) || { id: definition.id, unlocked: false };

    if (stored.unlocked) {
      return stored;
    }

    if (shouldUnlockAchievement(definition, streakSnapshot, completedLessons)) {
      newlyUnlocked.push(definition);
      return { id: definition.id, unlocked: true, unlockedAt: now };
    }

    return stored;
  });

  if (newlyUnlocked.length > 0 || lessonsUpdated) {
    await saveAchievementsData({
      achievements: updatedAchievements,
      completedLessons: Array.from(completedLessons),
      version: ACHIEVEMENTS_VERSION,
    });
  }

  return newlyUnlocked;
}

export async function getAchievementProgress(id: string): Promise<AchievementProgress | null> {
  const definition = ACHIEVEMENT_DEFINITIONS.find((item) => item.id === id);
  if (!definition) {
    return null;
  }

  const streaks = await getStreaks();
  const data = await getAchievementsData();

  switch (definition.unlockType) {
    case 'session_count': {
      const required = Number(definition.unlockValue);
      const current = Math.min(streaks.totalDays, required);
      return {
        current,
        required,
        percentage: required === 0 ? 0 : Math.min(100, (current / required) * 100),
      };
    }
    case 'streak_days': {
      const required = Number(definition.unlockValue);
      const current = Math.min(streaks.currentStreak, required);
      return {
        current,
        required,
        percentage: required === 0 ? 0 : Math.min(100, (current / required) * 100),
      };
    }
    case 'lesson_complete': {
      const completed = data.completedLessons || [];
      const required = BASIC_LESSON_IDS.length;
      const current = Math.min(
        BASIC_LESSON_IDS.filter((lessonId) => completed.includes(lessonId)).length,
        required,
      );
      return {
        current,
        required,
        percentage: required === 0 ? 0 : Math.min(100, (current / required) * 100),
      };
    }
    default:
      return null;
  }
}

export async function isLessonCompleted(lessonId: string): Promise<boolean> {
  const data = await getAchievementsData();
  return (data.completedLessons || []).includes(String(lessonId));
}

export async function resetAchievements(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ACHIEVEMENTS_KEY);
  } catch (error) {
    console.error('Error resetting achievements:', error);
    throw error;
  }
}
