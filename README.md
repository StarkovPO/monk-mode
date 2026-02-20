# Monk Mode - Meditation Timer App

A React Native meditation timer app built with Expo, featuring Anapanasati (Mindfulness of Breathing) meditation exercises with stage-by-stage guidance.

## Features

- **Structured Meditation Exercises**: Three Anapanasati exercises (15, 30, 60 minutes) with detailed stage breakdowns
- **Stage-by-Stage Guidance**: Clear instructions for each meditation stage with timing and techniques
- **Meditation Presets**: Beginner, Experienced, and Advanced meditation blocks
- **Streak Tracking**: Track your daily meditation practice
- **Session History**: View your meditation activity and progress
- **Offline-First**: All content works without internet connection
- **Multi-Language Support**: English, Russian, Spanish, French, German, Korean

## Prerequisites

Before running the app, ensure you have the following installed:

- **Node.js**: v18 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**: Comes with Node.js
- **Expo CLI**: Will be installed via npx
- **iOS Simulator** (Mac only): Xcode from App Store
- **Android Emulator**: Android Studio with AVD Manager

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd monk-mode
```

### 2. Navigate to Mobile App Directory

```bash
cd apps/mobile
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm start
```

This will start the Expo development server and show a QR code in your terminal.

### 5. Run on Device/Emulator

Choose one of the following options:

#### **Option A: iOS Simulator (Mac only)**

```bash
npm run ios
```

Or press `i` in the terminal after running `npm start`.

**Requirements**:
- Xcode installed from App Store
- iOS Simulator configured

#### **Option B: Android Emulator**

```bash
npm run android
```

Or press `a` in the terminal after running `npm start`.

**Requirements**:
- Android Studio installed
- Android Virtual Device (AVD) created and running

#### **Option C: Physical Device (Recommended for Testing)**

1. Install **Expo Go** app on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code shown in terminal with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## Project Structure

```
monk-mode/
├── apps/
│   └── mobile/              # React Native mobile app
│       ├── app/             # Expo Router pages and components
│       │   ├── data/        # Exercise and preset data
│       │   ├── services/    # i18n, storage, audio services
│       │   ├── components/  # Reusable UI components
│       │   ├── locales/     # Translation files
│       │   └── lessons/     # Meditation lesson content
│       ├── assets/          # Images, fonts, sounds
│       └── package.json     # Dependencies
├── specs/                   # Feature specifications
└── README.md               # This file
```

## Available Scripts

From the `apps/mobile` directory:

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser (experimental)
npm run web

# Type checking
npx tsc --noEmit
```

## Meditation Exercises

The app includes three Anapanasati meditation exercises:

### **Basic (15 minutes)** - Beginner Level
- **Stage 1**: Entering Meditation (1-2 min)
- **Stage 2**: Establishing Clear Comprehension (13-14 min)

### **Intermediate (30 minutes)** - Confident Practice
- **Stage 1**: Entering and Establishing Clear Comprehension (~15 min)
- **Stage 2**: Establishing Mindfulness in Front of Oneself (~5 min)
- **Stage 3**: Observing the Mind / Working with Reactions (5-10 min)

### **Advanced (60 minutes)** - Deep Dive
- **Stage 1**: Entering and Establishing Clear Comprehension (~15 min)
- **Stage 2**: Establishing Mindfulness in Front of Oneself (~5 min)
- **Stage 3**: Observing the Mind (5-10 min)
- **Stage 4**: Establishing Equanimity (~10 min)
- **Stage 5**: Establishing Concentration (15-20 min)

## Troubleshooting

### Port Already in Use

If you see "Port 8081 already in use":

```bash
# Kill the process using port 8081
npx kill-port 8081

# Or manually find and kill it
lsof -ti:8081 | xargs kill
```

### Metro Bundler Issues

Clear the cache and restart:

```bash
npm start -- --clear
```

### iOS Simulator Not Opening

```bash
# Open Xcode and ensure Command Line Tools are installed
xcode-select --install

# Reset simulator
xcrun simctl erase all
```

### Android Emulator Not Starting

1. Open Android Studio
2. Go to Tools → AVD Manager
3. Create or start an Android Virtual Device
4. Wait for emulator to fully boot before running `npm run android`

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development

### Adding New Meditation Exercises

Edit `apps/mobile/app/data/exercises.ts`:

```typescript
{
  id: 'my-exercise',
  name: 'My Exercise',
  durationSec: 900, // 15 minutes
  reminderText: 'Brief instruction',
  blockLevel: 'basic',
  description: 'Detailed description',
  stages: [
    {
      name: 'Stage Name',
      durationRange: '5-10 minutes',
      technique: 'What to do during this stage',
      order: 1,
    },
  ],
}
```

### Adding Translations

1. Add keys to `apps/mobile/app/locales/en.json`
2. Translate to other languages in respective locale files
3. Use in components: `t('your.translation.key')`

### Modifying Presets

Edit `apps/mobile/app/data/presets.ts` to change meditation preset configurations.

## Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Routing**: Expo Router v6
- **Storage**: AsyncStorage
- **Audio**: Expo AV
- **i18n**: Custom implementation with expo-localization

## Contributing

1. Create a feature branch from `main`
2. Follow the existing code style
3. Test on both iOS and Android
4. Update documentation if needed
5. Submit a pull request

## License

[Add your license here]

## Support

For issues or questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review closed issues in the repository
- Create a new issue with detailed information

---

**Happy Meditating! 🧘‍♂️**
