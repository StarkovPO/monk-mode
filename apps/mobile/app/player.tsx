import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, AppState } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { getPresetById } from './data/presets';
import { getExercisesByIds } from './data/exercises';
import { MeditationTimer, TimerState } from './services/timer';
import { playTransitionBeep, initializeAudio } from './services/audio';
import { recordSessionStart } from './services/streaks';
import { saveSession } from './services/storage';
import { t } from './services/i18n';

export default function Player() {
  const router = useRouter();
  const { preset: presetId } = useLocalSearchParams<{ preset: string }>();
  
  const [timerState, setTimerState] = useState<TimerState | null>(null);
  const timerRef = useRef<MeditationTimer | null>(null);
  const appState = useRef(AppState.currentState);
  const sessionStartTimeRef = useRef<string>('');

  const handlePause = () => {
    timerRef.current?.pause();
  };

  const handleResume = () => {
    timerRef.current?.resume();
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Exercise',
      'Are you sure you want to skip to the next exercise?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Skip', onPress: () => timerRef.current?.skip() },
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Session',
      'Are you sure you want to cancel this session? Your progress will not be saved.',
      [
        { text: 'Continue', style: 'cancel' },
        {
          text: 'Cancel Session',
          style: 'destructive',
          onPress: () => {
            timerRef.current?.cancel();
            router.back();
          },
        },
      ]
    );
  };

  // Load preset and initialize timer
  useEffect(() => {
    if (!presetId) {
      Alert.alert('Error', 'No preset selected');
      router.back();
      return;
    }

    const preset = getPresetById(presetId);
    if (!preset) {
      Alert.alert('Error', 'Invalid preset');
      router.back();
      return;
    }

    const exercises = getExercisesByIds(preset.exerciseIds);
    if (exercises.length === 0) {
      Alert.alert('Error', 'No exercises found');
      router.back();
      return;
    }

    // Initialize audio
    initializeAudio();

    // Handler for session complete
    const handleSessionComplete = async () => {
      const currentTimerState = timerRef.current?.getState();
      const currentSessionStart = sessionStartTimeRef.current;
      
      if (!currentTimerState || !currentSessionStart) {
        console.warn('Session complete but missing state or start time');
        return;
      }

      // Save session data
      const sessionData = {
        id: Date.now().toString(),
        presetId: presetId || '',
        startTime: currentSessionStart,
        endTime: new Date().toISOString(),
        completedExercises: currentTimerState.currentExerciseIndex + 1,
        totalExercises: currentTimerState.totalExercises,
        elapsedSec: currentTimerState.totalElapsedSec,
      };

      try {
        await saveSession(sessionData);
      } catch (error) {
        console.error('Failed to save session:', error);
      }

      // Navigate to summary with session data
      router.push({
        pathname: '/summary',
        params: {
          duration: currentTimerState.totalElapsedSec.toString(),
          completed: sessionData.completedExercises.toString(),
          total: sessionData.totalExercises.toString(),
        },
      });
    };

    // Create timer
    const timer = new MeditationTimer(
      exercises,
      // onTick callback
      (state) => {
        setTimerState(state);
      },
      // onExerciseComplete callback
      async () => {
        await playTransitionBeep();
      },
      // onSessionComplete callback
      () => {
        handleSessionComplete();
      }
    );

    timerRef.current = timer;
    setTimerState(timer.getState());

    // Keep screen awake during session
    activateKeepAwakeAsync();

    // Record session start time for streaks
    const startTime = new Date().toISOString();
    sessionStartTimeRef.current = startTime;
    recordSessionStart(startTime).catch((error) => {
      console.error('Failed to record session start:', error);
    });

    // Start the timer
    timer.start();

    // Handle app state changes (backgrounding)
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // App came to foreground - reconcile timer
        timerRef.current?.reconcile();
      }
      appState.current = nextAppState;
    });

    return () => {
      // Cleanup
      timerRef.current?.cancel();
      deactivateKeepAwake();
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetId]);

  if (!timerState) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  const currentExercise = timerRef.current?.getCurrentExercise();
  const minutes = Math.floor(timerState.remainingSec / 60);
  const seconds = timerState.remainingSec % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  const progressText = `Exercise ${timerState.currentExerciseIndex + 1} of ${timerState.totalExercises}`;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.progress}>{progressText}</Text>
        <Text style={styles.exerciseName}>{currentExercise?.nameKey ? t(currentExercise.nameKey) : 'Exercise'}</Text>
        <Text style={styles.timer}>{timeDisplay}</Text>
        <Text style={styles.instruction}>{currentExercise?.reminderTextKey ? t(currentExercise.reminderTextKey) : ''}</Text>
      </View>
      
      <View style={styles.controls}>
        {timerState.isPaused ? (
          <Pressable 
            style={({ pressed }) => [
              styles.controlButton,
              pressed && styles.controlButtonPressed
            ]}
            onPress={handleResume}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.controlText}>Resume</Text>
          </Pressable>
        ) : (
          <Pressable 
            style={({ pressed }) => [
              styles.controlButton,
              pressed && styles.controlButtonPressed
            ]}
            onPress={handlePause}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.controlText}>Pause</Text>
          </Pressable>
        )}
        <Pressable 
          style={({ pressed }) => [
            styles.controlButton,
            pressed && styles.controlButtonPressed
          ]}
          onPress={handleSkip}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.controlText}>Skip</Text>
        </Pressable>
      </View>

      <View style={styles.bottomActions}>
        <Pressable 
          onPress={handleCancel} 
          style={({ pressed }) => [
            styles.cancelButton,
            pressed && styles.cancelButtonPressed
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.cancelText}>Cancel Session</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 24,
  },
  loading: {
    flex: 1,
    color: '#666666',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    color: '#999999',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  exerciseName: {
    color: '#1A1A1A',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
  },
  timer: {
    color: '#1A1A1A',
    fontSize: 72,
    fontWeight: '300',
    marginBottom: 32,
    textAlign: 'center',
  },
  instruction: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 24,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 12,
  },
  controlButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 28,
    minHeight: 56,
    minWidth: 120,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  controlButtonPressed: {
    backgroundColor: '#F5F5F5',
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  controlText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomActions: {
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 140,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonPressed: {
    backgroundColor: '#F0F0F0',
    opacity: 0.8,
  },
  cancelText: {
    color: '#999999',
    fontSize: 15,
    fontWeight: '500',
  },
});
