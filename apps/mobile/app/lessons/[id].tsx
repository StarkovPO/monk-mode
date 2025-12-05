import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

const lessons: Record<string, { title: string; content: string }> = {
  '1': {
    title: 'Introduction to Meditation',
    content: 'Meditation is a practice of focused attention and awareness. Begin with just 5 minutes a day, finding a quiet space where you can sit comfortably. The goal is not to empty your mind, but to observe your thoughts without judgment.\n\nKey principles:\n• Start small and build gradually\n• Be consistent with your practice\n• Let go of expectations\n• Notice when your mind wanders and gently return to focus',
  },
  '2': {
    title: 'Breath Awareness',
    content: 'Focus on the natural rhythm of your breath. Feel the air entering and leaving your nostrils, the rise and fall of your chest and belly. When your mind wanders, simply notice and return to the breath.\n\nTechnique:\n• Sit comfortably with your spine straight\n• Close your eyes or lower your gaze\n• Breathe naturally, without forcing\n• Count breaths if it helps maintain focus',
  },
  '3': {
    title: 'Body Scan',
    content: 'Systematically direct your attention through different parts of your body, releasing tension as you go. This practice cultivates body awareness and deep relaxation.\n\nSteps:\n• Start at the top of your head\n• Move slowly down through each body part\n• Notice sensations without trying to change them\n• Release tension with each exhale',
  },
  '4': {
    title: 'Loving Kindness',
    content: 'Loving kindness meditation cultivates compassion for yourself and others. Begin by directing warm wishes toward yourself, then gradually extend them outward to loved ones, acquaintances, difficult people, and all beings.\n\nPhrases to use:\n• May I be happy and healthy\n• May I be safe and protected\n• May I live with ease\n\nNotice resistance without judgment. With practice, this meditation opens the heart and reduces negative emotions toward yourself and others.',
  },
  '5': {
    title: 'Mindful Walking',
    content: 'Walking meditation brings mindfulness into motion. Choose a quiet path and walk slowly, paying attention to each step. Feel your feet lifting, moving through air, and touching the ground.\n\nPractice:\n• Walk at a slower pace than normal\n• Focus on the sensations in your feet and legs\n• Coordinate breath with steps if helpful\n• Notice your surroundings with soft awareness\n\nThis practice is especially useful when sitting meditation feels difficult or when you need to integrate mindfulness into daily activities.',
  },
  '6': {
    title: 'Visualization',
    content: 'Visualization uses imagination to create peaceful mental states. Picture a place where you feel completely safe and relaxed—perhaps a beach, forest, or mountain meadow. Engage all your senses in this inner sanctuary.\n\nElements to include:\n• Visual details (colors, light, shapes)\n• Sounds (waves, birds, wind)\n• Physical sensations (warmth, breeze, texture)\n• Scents and even tastes\n\nReturn to this place whenever you need calm or grounding. The mind responds to imagined experiences similarly to real ones, making visualization a powerful tool for relaxation.',
  },
  '7': {
    title: 'Sound Meditation',
    content: 'In sound meditation, listening becomes the object of focus. Instead of blocking out sounds, welcome them fully. Notice the quality, volume, duration, and space between sounds without labeling or judging them.\n\nApproach:\n• Sit quietly and let sounds come to you\n• Notice both near and distant sounds\n• Observe how sounds arise, peak, and fade\n• Notice silence between sounds\n\nThis practice develops concentration and acceptance. You learn to be with whatever is present, a skill that extends far beyond meditation.',
  },
  '8': {
    title: 'Open Awareness',
    content: 'Open awareness is the practice of pure presence without focusing on any particular object. Rather than directing attention to breath, body, or sound, you simply rest in awareness itself, noticing whatever arises and passes.\n\nKey aspects:\n• Let go of effort and control\n• Be aware of awareness itself\n• Don\'t chase or reject experiences\n• Rest in the spaciousness of mind\n\nThis advanced practice reveals the nature of consciousness. It requires patience and often benefits from experience with other meditation forms first. Trust the process and be gentle with yourself.',
  },
};

export default function LessonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = lessons[id] || { title: `Lesson ${id}`, content: 'Content coming soon...' };
  
  return (
    <SafeAreaView style={styles.wrapper} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.content}>{lesson.content}</Text>
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
          <Text style={styles.backText}>← Back to Lessons</Text>
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
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    marginTop: 8,
    letterSpacing: -0.5,
  },
  content: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 26,
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
    minWidth: 180,
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
