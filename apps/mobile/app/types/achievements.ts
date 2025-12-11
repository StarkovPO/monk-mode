export type UnlockType = 'session_count' | 'streak_days' | 'lesson_complete';

export interface AchievementDefinition {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unlockType: UnlockType;
  unlockValue: number | string;
}

export interface Achievement {
  id: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface AchievementsData {
  achievements: Achievement[];
  completedLessons?: string[];
  version: number;
}

export interface AchievementWithDefinition extends AchievementDefinition {
  unlocked: boolean;
  unlockedAt?: string;
}

export type AchievementEvent =
  | {
      type: 'session_complete';
      metadata: {
        totalSessions: number;
        currentStreak: number;
      };
    }
  | {
      type: 'streak_update';
      metadata: {
        currentStreak: number;
        totalSessions?: number;
      };
    }
  | {
      type: 'lesson_complete';
      metadata: {
        lessonId: string;
        completedLessons?: number;
        totalLessons?: number;
        categoryId?: string;
      };
    };

export interface AchievementProgress {
  current: number;
  required: number;
  percentage: number;
}
