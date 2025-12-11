import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

let transitionSound: Sound | null = null;
let isAudioInitialized = false;

/**
 * Initialize audio system and load transition beep
 */
export async function initializeAudio(): Promise<void> {
  try {
    // Set audio mode for playback
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });

    // Try to load the transition beep sound
    // Note: beep.mp3 should be added to assets/ directory
    // See assets/AUDIO_README.md for instructions
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/beep.mp3'),
        { shouldPlay: false }
      );
      transitionSound = sound;
      isAudioInitialized = true;
    } catch (audioError) {
      console.warn('Audio file not found. Audio cues will be skipped. See assets/AUDIO_README.md');
      // Continue without audio - app will work silently
      isAudioInitialized = false;
    }
  } catch (error) {
    console.warn('Error initializing audio:', error);
    // Audio initialization failed, but app should continue
    isAudioInitialized = false;
  }
}

/**
 * Play transition beep when moving between exercises
 */
export async function playTransitionBeep(): Promise<boolean> {
  try {
    if (!isAudioInitialized) {
      await initializeAudio();
    }

    if (transitionSound) {
      // Rewind to start if already played
      await transitionSound.setPositionAsync(0);
      await transitionSound.playAsync();
      return true;
    }

    return false;
  } catch (error) {
    console.warn('Error playing transition beep:', error);
    return false;
  }
}

/**
 * Clean up audio resources
 */
export async function cleanupAudio(): Promise<void> {
  try {
    if (transitionSound) {
      await transitionSound.unloadAsync();
      transitionSound = null;
    }
    isAudioInitialized = false;
  } catch (error) {
    console.error('Error cleaning up audio:', error);
  }
}

/**
 * Check if audio is available
 */
export function isAudioAvailable(): boolean {
  return isAudioInitialized;
}
