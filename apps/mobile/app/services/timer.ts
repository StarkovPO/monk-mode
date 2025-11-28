import { Exercise } from '../data/exercises';

export interface TimerState {
  currentExerciseIndex: number;
  remainingSec: number;
  totalExercises: number;
  isPaused: boolean;
  isFinished: boolean;
  totalElapsedSec: number;
  lastTickTime: number; // For wall-clock reconciliation
}

export type TimerCallback = (state: TimerState) => void;
export type CompletionCallback = () => void;

/**
 * Timer class for meditation session countdown
 * Uses Date.now() for wall-clock reconciliation to handle backgrounding
 */
export class MeditationTimer {
  private state: TimerState;
  private exercises: Exercise[];
  private intervalId: NodeJS.Timeout | null = null;
  private onTick: TimerCallback;
  private onExerciseComplete: CompletionCallback;
  private onSessionComplete: CompletionCallback;

  constructor(
    exercises: Exercise[],
    onTick: TimerCallback,
    onExerciseComplete: CompletionCallback,
    onSessionComplete: CompletionCallback
  ) {
    this.exercises = exercises;
    this.onTick = onTick;
    this.onExerciseComplete = onExerciseComplete;
    this.onSessionComplete = onSessionComplete;

    this.state = {
      currentExerciseIndex: 0,
      remainingSec: exercises[0]?.durationSec || 0,
      totalExercises: exercises.length,
      isPaused: false,
      isFinished: false,
      totalElapsedSec: 0,
      lastTickTime: Date.now(),
    };
  }

  /**
   * Start the timer
   */
  start(): void {
    if (this.intervalId || this.state.isFinished) {
      return;
    }

    this.state.lastTickTime = Date.now();
    this.state.isPaused = false;

    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);
  }

  /**
   * Pause the timer
   */
  pause(): void {
    if (!this.intervalId || this.state.isPaused) {
      return;
    }

    this.state.isPaused = true;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.onTick(this.state);
  }

  /**
   * Resume the timer from paused state
   */
  resume(): void {
    if (!this.state.isPaused || this.state.isFinished) {
      return;
    }

    this.state.isPaused = false;
    this.state.lastTickTime = Date.now();
    this.start();
  }

  /**
   * Skip to next exercise
   */
  skip(): void {
    if (this.state.isFinished) {
      return;
    }

    // Add remaining time to total elapsed
    const currentExercise = this.exercises[this.state.currentExerciseIndex];
    const exerciseElapsed = currentExercise.durationSec - this.state.remainingSec;
    this.state.totalElapsedSec += exerciseElapsed;

    // Move to next exercise
    this.advanceToNextExercise();
  }

  /**
   * Cancel/stop the timer
   */
  cancel(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.state.isFinished = true;
  }

  /**
   * Get current state
   */
  getState(): TimerState {
    return { ...this.state };
  }

  /**
   * Get current exercise
   */
  getCurrentExercise(): Exercise | null {
    return this.exercises[this.state.currentExerciseIndex] || null;
  }

  /**
   * Reconcile timer after app was backgrounded
   * Call this when app comes back to foreground
   */
  reconcile(): void {
    if (this.state.isPaused || this.state.isFinished) {
      return;
    }

    const now = Date.now();
    const elapsedMs = now - this.state.lastTickTime;
    const elapsedSec = Math.floor(elapsedMs / 1000);

    if (elapsedSec > 0) {
      this.state.remainingSec = Math.max(0, this.state.remainingSec - elapsedSec);
      this.state.totalElapsedSec += elapsedSec;
      this.state.lastTickTime = now;

      if (this.state.remainingSec === 0) {
        this.handleExerciseComplete();
      } else {
        this.onTick(this.state);
      }
    }
  }

  /**
   * Internal tick function called every second
   */
  private tick(): void {
    const now = Date.now();
    const elapsedMs = now - this.state.lastTickTime;

    // Reconcile if more than 1.5 seconds passed (clock drift or backgrounding)
    if (elapsedMs > 1500) {
      const elapsedSec = Math.floor(elapsedMs / 1000);
      this.state.remainingSec = Math.max(0, this.state.remainingSec - elapsedSec);
      this.state.totalElapsedSec += elapsedSec;
    } else {
      // Normal tick
      this.state.remainingSec = Math.max(0, this.state.remainingSec - 1);
      this.state.totalElapsedSec += 1;
    }

    this.state.lastTickTime = now;

    if (this.state.remainingSec === 0) {
      this.handleExerciseComplete();
    } else {
      this.onTick(this.state);
    }
  }

  /**
   * Handle exercise completion and advance to next
   */
  private handleExerciseComplete(): void {
    this.onExerciseComplete();
    this.advanceToNextExercise();
  }

  /**
   * Move to next exercise or finish session
   */
  private advanceToNextExercise(): void {
    const nextIndex = this.state.currentExerciseIndex + 1;

    if (nextIndex >= this.exercises.length) {
      // Session complete
      this.state.isFinished = true;
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.onSessionComplete();
    } else {
      // Move to next exercise
      this.state.currentExerciseIndex = nextIndex;
      this.state.remainingSec = this.exercises[nextIndex].durationSec;
      this.state.lastTickTime = Date.now();
      this.onTick(this.state);
    }
  }
}
