export interface Exercise {
  id: string;
  name: string;
  durationSec: number;
  reminderText: string;
}

export const exercises: Exercise[] = [
  {
    id: 'breath-awareness',
    name: 'Breath Awareness',
    durationSec: 300, // 5 minutes
    reminderText: 'Focus on your natural breath. Notice the air entering and leaving your nostrils.',
  },
  {
    id: 'body-scan',
    name: 'Body Scan',
    durationSec: 420, // 7 minutes
    reminderText: 'Slowly scan your body from head to toe. Release tension as you breathe.',
  },
  {
    id: 'loving-kindness',
    name: 'Loving Kindness',
    durationSec: 360, // 6 minutes
    reminderText: 'Send compassion to yourself and others. May all beings be happy and free.',
  },
  {
    id: 'mindful-observation',
    name: 'Mindful Observation',
    durationSec: 240, // 4 minutes
    reminderText: 'Observe your thoughts without judgment. Let them pass like clouds in the sky.',
  },
  {
    id: 'gratitude-practice',
    name: 'Gratitude Practice',
    durationSec: 300, // 5 minutes
    reminderText: 'Bring to mind three things you are grateful for. Feel the warmth of appreciation.',
  },
  {
    id: 'sound-meditation',
    name: 'Sound Meditation',
    durationSec: 360, // 6 minutes
    reminderText: 'Listen deeply to sounds around you. Notice their quality, distance, and duration.',
  },
  {
    id: 'visualization',
    name: 'Visualization',
    durationSec: 420, // 7 minutes
    reminderText: 'Visualize a peaceful place. Engage all your senses in this safe haven.',
  },
  {
    id: 'walking-meditation',
    name: 'Walking Meditation',
    durationSec: 480, // 8 minutes
    reminderText: 'Feel each step. Notice the sensation of your feet touching the ground.',
  },
  {
    id: 'open-awareness',
    name: 'Open Awareness',
    durationSec: 600, // 10 minutes
    reminderText: 'Rest in pure awareness. Notice whatever arises without attachment.',
  },
  {
    id: 'heart-center',
    name: 'Heart Center',
    durationSec: 300, // 5 minutes
    reminderText: 'Place attention on your heart center. Breathe into this space of compassion.',
  },
  {
    id: 'counting-breaths',
    name: 'Counting Breaths',
    durationSec: 240, // 4 minutes
    reminderText: 'Count each breath from 1 to 10, then start again. Gently return when you lose count.',
  },
  {
    id: 'noting-practice',
    name: 'Noting Practice',
    durationSec: 360, // 6 minutes
    reminderText: 'Silently note sensations, thoughts, and emotions as they arise. "Thinking", "feeling", "hearing".',
  },
];

export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find((exercise) => exercise.id === id);
};

export const getExercisesByIds = (ids: string[]): Exercise[] => {
  return ids.map((id) => getExerciseById(id)).filter(Boolean) as Exercise[];
};
