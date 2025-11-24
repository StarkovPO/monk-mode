# Quickstart: Expo App

## Prereqs
- Node LTS, npm or yarn
- Expo CLI (npx is fine)

## Create app
```
npx create-expo-app@latest monk-mode --template blank
cd monk-mode
```

## Install deps
```
npm i @react-native-async-storage/async-storage expo-av expo-keep-awake
```

## Useful scripts
```
npx expo run:ios    # or: npx expo start -c, then i
npx expo run:android
```

## Structure (suggested)
```
app/
  screens/
    LessonsList.tsx
    LessonDetail.tsx
    SessionPreset.tsx
    SessionPlayer.tsx
    SessionSummary.tsx
  services/
    timer.ts
    streaks.ts
    storage.ts
    audio.ts
  data/
    lessons.json
    presets.json
```

## Notes
- Keep screen awake during sessions with expo-keep-awake.
- Use AppState to pause/resume and reconcile timer.
- Persist streaks, settings via AsyncStorage.
- Bundle all content; no network calls.
