import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { initI18n } from './services/i18n';

export default function RootLayout() {
  // Initialize i18n on app startup
  useEffect(() => {
    initI18n();
  }, []);

  // Note: Flipper disabled - using in-app Debug Panel instead
  // Expo SDK 54 has issues with external debuggers
  return <Slot />;
}
