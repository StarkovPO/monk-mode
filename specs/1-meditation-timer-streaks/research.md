# Research: Expo Mobile MVP

## Decision: Use Expo (managed workflow)
- Rationale: Fast bootstrap, OTA updates optional, rich SDK (expo-av, keep-awake), simpler builds.
- Alternatives: RN CLI (heavier native setup), Flutter (different stack). Expo chosen for speed and scope.

## Timer Accuracy in RN/Expo
- Use JS timers with wall-clock compensation (Date.now deltas) to reduce drift.
- Reconcile on AppState changes (pause when backgrounded; on resume, adjust remaining time).
- Avoid long single timeouts; prefer intervals with correction.

## Storage
- Use @react-native-async-storage/async-storage for simple key/value persistence.
- Keys: streaks, lastSession, lessonsSeen (optional), settings (sound).
- Alternatives: expo-sqlite (overkill for MVP), MMKV (fast but extra dep). AsyncStorage chosen for ubiquity.

## Audio
- Use expo-av to load and play a short beep; pre-load sound for minimal latency.
- Handle silent mode/vibration fallback where appropriate; do not block progression if audio fails.

## AppState & Keep Awake
- Use react-native AppState to detect background/foreground transitions.
- Use expo-keep-awake during active sessions to reduce throttling and screen sleep.

## A11Y
- Use accessibilityLabel, accessibilityRole; ensure touch targets ≥ 44x44 pt; sufficient contrast.

## Streak Logic
- Credit day based on local device date at session start.
- Track current, longest, total; prevent double credit per day.

## Packaging
- English only; bundled mock data (8 lessons, presets).
