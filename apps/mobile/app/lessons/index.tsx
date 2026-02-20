import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lessons } from '../data/lessons';
import { t } from '../services/i18n';

const SCROLL_POSITION_KEY = '@monk_mode:lessons_scroll_position';

export default function Lessons() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPositionRef = useRef(0);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Restore scroll position when component mounts
  useEffect(() => {
    const restoreScrollPosition = async () => {
      try {
        const savedPosition = await AsyncStorage.getItem(SCROLL_POSITION_KEY);
        if (savedPosition && scrollViewRef.current) {
          const position = parseFloat(savedPosition);
          scrollPositionRef.current = position;
          // Use setTimeout to ensure ScrollView is fully rendered
          setTimeout(() => {
            scrollViewRef.current?.scrollTo({
              y: position,
              animated: false,
            });
          }, 100);
        }
      } catch (error) {
        console.error('Error restoring scroll position:', error);
      }
    };

    restoreScrollPosition();

    // Save scroll position when component unmounts (navigating away)
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      AsyncStorage.setItem(SCROLL_POSITION_KEY, scrollPositionRef.current.toString()).catch(
        (error) => console.error('Error saving scroll position on unmount:', error)
      );
    };
  }, []);

  // Track scroll position and debounce saves to AsyncStorage
  const handleScroll = (event: any) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    scrollPositionRef.current = yOffset;

    // Debounce AsyncStorage writes (save after 500ms of no scrolling)
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      AsyncStorage.setItem(SCROLL_POSITION_KEY, yOffset.toString()).catch((error) =>
        console.error('Error saving scroll position:', error)
      );
    }, 500);
  };

  return (
    <SafeAreaView style={styles.wrapper} edges={['top']}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Text style={styles.title}>Meditation Lessons</Text>
        {lessons.map((lesson) => (
          <Link key={lesson.id} href={`/lessons/${lesson.id}`} asChild>
            <Pressable style={styles.lessonCard}>
              <Text style={styles.lessonTitle}>{t(lesson.titleKey)}</Text>
              <Text style={styles.lessonSummary}>{t(lesson.summaryKey)}</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
      
      <View style={styles.bottomActions}>
        <Pressable 
          onPress={() => router.back()} 
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backText}>{t('navigation.backToHome')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    color: '#1A1A1A',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  lessonTitle: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  lessonSummary: {
    color: '#666666',
    fontSize: 14,
  },
  bottomActions: {
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 160,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButtonPressed: {
    backgroundColor: '#F0F0F0',
    opacity: 0.8,
  },
  backText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '600',
  },
});
