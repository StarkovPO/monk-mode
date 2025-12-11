# Quickstart: Streak Display Page (Activity Page)

## Overview
Add an "Activity" page to display meditation streak statistics to users. This page shows current streak, longest streak, and total sessions completed.

## Prerequisites
- Feature 1 (meditation-timer-streaks) completed
- Existing streaks service at `/apps/mobile/app/services/streaks.ts`
- Expo Router configured
- react-native-safe-area-context installed

## Quick Implementation Guide

### 1. Create Activity Page Component
**File**: `/apps/mobile/app/activity.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { getCurrentStreaks } from './services/streaks';

// Main component
// - Fetch streak data on mount
// - Display current streak, longest streak, total sessions
// - Handle loading and empty states
// - Include back button
```

### 2. Add Home Navigation
**File**: `/apps/mobile/app/index.tsx`

```typescript
// Add navigation button:
<Pressable onPress={() => router.push('/activity')}>
  <Text>Activity</Text>
</Pressable>
```

### 3. Add Summary Navigation
**File**: `/apps/mobile/app/summary.tsx`

```typescript
// Add button after session stats:
<Pressable onPress={() => router.push('/activity')}>
  <Text>My Activity</Text>
</Pressable>
```

## Data Source

Use existing streak service:

```typescript
import { getCurrentStreaks } from './services/streaks';

const streaks = await getCurrentStreaks();
// Returns: { currentStreak, longestStreak, totalDays, lastCreditedDate }
```

## Design Pattern

Follow existing screen patterns:
- **SafeAreaView** with `edges={['top']}` for Dynamic Island/notch
- **Bottom actions** with 24pt bottom padding (home indicator clearance)
- **Card layout** for stats display
- **Colors**: #FAFAFA background, #1A1A1A text, #FFFFFF cards

## Testing Checklist

- [ ] Navigate to activity page from home screen
- [ ] Navigate to activity page from summary screen
- [ ] Verify current streak displays correctly
- [ ] Verify longest streak displays correctly
- [ ] Verify total sessions displays correctly
- [ ] Test with 0 sessions (empty state)
- [ ] Test with streak broken (current < longest)
- [ ] Test back button navigation
- [ ] Verify page loads in <500ms
- [ ] Verify accessibility (touch targets, contrast)

## Common Pitfalls

1. **Missing SafeAreaView**: Content appears under Dynamic Island/notch
   - Solution: Wrap in `<SafeAreaView edges={['top']}>`

2. **Bottom button conflicts with home indicator**: Button too close to bottom edge
   - Solution: Use `paddingBottom: 24` in bottomActions

3. **Stale data**: Showing old streak counts
   - Solution: Call `getCurrentStreaks()` in useEffect on mount

4. **Inconsistent styling**: Doesn't match existing screens
   - Solution: Reference preset.tsx, lessons/index.tsx for style patterns

## Files Modified

**New**:
- `/apps/mobile/app/activity.tsx`

**Modified**:
- `/apps/mobile/app/index.tsx` (add navigation)
- `/apps/mobile/app/summary.tsx` (add navigation)

## Success Criteria

✓ 1-tap navigation from home screen  
✓ Page loads in <500ms  
✓ Clear visual hierarchy  
✓ 100% accuracy with streak service  
✓ Accessible design (44pt targets, safe areas)

## Next Steps

After implementation:
1. Test all acceptance scenarios manually
2. Verify on both iOS and Android
3. Check accessibility with VoiceOver/TalkBack
4. Update tasks.md to mark complete
