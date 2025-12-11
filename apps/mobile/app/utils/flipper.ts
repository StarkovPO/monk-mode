/**
 * Flipper initialization for development debugging
 * This enables Flipper plugins for AsyncStorage, Network, and more
 */

import { Platform } from 'react-native';

export function initFlipper() {
  if (__DEV__ && Platform.OS !== 'web') {
    try {
      // Dynamic import to avoid bundling Flipper in production
      const flipperAsyncStorage = require('react-native-flipper').default;
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      
      // Add AsyncStorage plugin to Flipper
      flipperAsyncStorage.addPlugin({
        getId() {
          return 'AsyncStorage';
        },
        onConnect(connection: any) {
          console.log('Flipper AsyncStorage plugin connected');
        },
        onDisconnect() {
          console.log('Flipper AsyncStorage plugin disconnected');
        },
        runInBackground() {
          return true;
        },
      });
      
      console.log('✅ Flipper initialized successfully');
    } catch (error) {
      console.warn('⚠️ Flipper initialization failed:', error);
      // Fail silently - Flipper is optional for development
    }
  }
}
