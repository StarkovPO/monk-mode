import { getStreaks, saveStreaks, Streaks } from './storage';

/**
 * Get local date string in YYYY-MM-DD format
 */
function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse date string (YYYY-MM-DD) to Date object
 */
function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Check if two dates are consecutive days
 */
function areConsecutiveDays(date1: string, date2: string): boolean {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

/**
 * Record a session start and update streaks if it's a new day
 * @param startTimestamp - ISO string of session start time
 * @returns Updated streaks
 */
export async function recordSessionStart(startTimestamp: string): Promise<Streaks> {
  try {
    const sessionDate = getLocalDateString(new Date(startTimestamp));
    const currentStreaks = await getStreaks();

    // Check if this day was already credited
    if (currentStreaks.lastCreditedDate === sessionDate) {
      // Same day, no update needed
      return currentStreaks;
    }

    let newStreaks: Streaks;

    if (!currentStreaks.lastCreditedDate) {
      // First ever meditation
      newStreaks = {
        lastCreditedDate: sessionDate,
        currentStreak: 1,
        longestStreak: 1,
        totalDays: 1,
      };
    } else if (areConsecutiveDays(currentStreaks.lastCreditedDate, sessionDate)) {
      // Consecutive day - increment streak
      const newCurrentStreak = currentStreaks.currentStreak + 1;
      newStreaks = {
        lastCreditedDate: sessionDate,
        currentStreak: newCurrentStreak,
        longestStreak: Math.max(currentStreaks.longestStreak, newCurrentStreak),
        totalDays: currentStreaks.totalDays + 1,
      };
    } else {
      // Streak broken - start new streak
      newStreaks = {
        lastCreditedDate: sessionDate,
        currentStreak: 1,
        longestStreak: currentStreaks.longestStreak,
        totalDays: currentStreaks.totalDays + 1,
      };
    }

    await saveStreaks(newStreaks);
    return newStreaks;
  } catch (error) {
    console.error('Error recording session start:', error);
    throw error;
  }
}

/**
 * Get current streaks data
 */
export async function getCurrentStreaks(): Promise<Streaks> {
  return await getStreaks();
}

/**
 * Reset all streaks (for testing or user request)
 */
export async function resetStreaks(): Promise<void> {
  const emptyStreaks: Streaks = {
    lastCreditedDate: '',
    currentStreak: 0,
    longestStreak: 0,
    totalDays: 0,
  };
  await saveStreaks(emptyStreaks);
}

/**
 * Calculate if user would maintain streak by meditating today
 */
export async function wouldMaintainStreak(): Promise<boolean> {
  const streaks = await getStreaks();
  if (!streaks.lastCreditedDate) {
    return true; // No streak to maintain
  }

  const today = getLocalDateString();
  return areConsecutiveDays(streaks.lastCreditedDate, today);
}
