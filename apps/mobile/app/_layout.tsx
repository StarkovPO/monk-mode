import { Slot } from 'expo-router';

export default function RootLayout() {
  // Note: Flipper disabled - using in-app Debug Panel instead
  // Expo SDK 54 has issues with external debuggers
  return <Slot />;
}
