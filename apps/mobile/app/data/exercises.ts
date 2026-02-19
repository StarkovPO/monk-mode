export interface MeditationStage {
  name: string;
  durationRange: string;
  technique: string;
  order: number;
}

export interface Exercise {
  id: string;
  name: string;
  durationSec: number;
  reminderText: string;
  stages?: MeditationStage[];
  blockLevel?: 'basic' | 'intermediate' | 'advanced';
  description?: string;
}

export const exercises: Exercise[] = [
  {
    id: 'anapanasati-basic',
    name: 'Anapanasati Basic',
    durationSec: 900, // 15 minutes
    reminderText: 'Follow your breath with gentle attention. Count each cycle from 1 to 10.',
    blockLevel: 'basic',
    description: 'Foundation practice focusing on entering meditation and establishing clear comprehension through breath counting.',
    stages: [
      {
        name: 'Entering Meditation',
        durationRange: '1-2 minutes',
        technique: 'Assume your posture, scan your senses, and let go of the past and future. Settle into the present moment.',
        order: 1,
      },
      {
        name: 'Establishing Clear Comprehension',
        durationRange: '13-14 minutes',
        technique: 'Count your breaths from 1 to 10, then start over. Use mental labels "inhale/exhale", then drop the words and observe in silence.',
        order: 2,
      },
    ],
  },
  {
    id: 'anapanasati-intermediate',
    name: 'Anapanasati Intermediate',
    durationSec: 1800, // 30 minutes
    reminderText: 'Stabilize your mind, establish awareness in front of you, and observe arising reactions with equanimity.',
    blockLevel: 'intermediate',
    description: 'Intermediate practice covering stabilization, continuous awareness, and working with mental reactions.',
    stages: [
      {
        name: 'Entering and Establishing Clear Comprehension',
        durationRange: '~15 minutes',
        technique: 'Basic stabilization through counting breaths and tracking the phases of each breath cycle.',
        order: 1,
      },
      {
        name: 'Establishing Mindfulness in Front of Oneself',
        durationRange: '~5 minutes',
        technique: 'Perceive experience as a continuous flow. Observe every moment without delays or clinging - "new, new, new".',
        order: 2,
      },
      {
        name: 'Observing the Mind / Working with Reactions',
        durationRange: '5-10 minutes',
        technique: 'If strong reactions arise, distance yourself from them (Big Mind), investigate with labels ("this is not me", "this is impermanent"), and direct loving-kindness if needed.',
        order: 3,
      },
    ],
  },
  {
    id: 'anapanasati-advanced',
    name: 'Anapanasati Advanced',
    durationSec: 3600, // 60 minutes
    reminderText: 'Progress through all five stages: stabilize, observe, purify, establish equanimity, and deepen concentration.',
    blockLevel: 'advanced',
    description: 'Complete practice covering all five stages for deepest purification and calming of the mind.',
    stages: [
      {
        name: 'Entering and Establishing Clear Comprehension',
        durationRange: '~15 minutes',
        technique: 'Calm down on the breath. Count cycles and track each phase with clear awareness.',
        order: 1,
      },
      {
        name: 'Establishing Mindfulness in Front of Oneself',
        durationRange: '~5 minutes',
        technique: 'Second-by-second tracking of the flow of experiences. Notice each moment arising and passing.',
        order: 2,
      },
      {
        name: 'Observing the Mind',
        durationRange: '5-10 minutes',
        technique: 'Purify the mind from strong hindrances and reactions. Use Big Mind perspective and investigation techniques.',
        order: 3,
      },
      {
        name: 'Establishing Equanimity',
        durationRange: '~10 minutes',
        technique: 'Press the "brake pedal". Let go of any craving away from the breath. Enjoy the peace, richness, and self-sufficiency of the moment.',
        order: 4,
      },
      {
        name: 'Establishing Concentration',
        durationRange: '15-20 minutes',
        technique: 'Softly press the "gas pedal". The mind gathers fully around the breath. Track each inhale, pause, and exhale without gaps or distractions.',
        order: 5,
      },
    ],
  },
];

export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find((exercise) => exercise.id === id);
};

export const getExercisesByIds = (ids: string[]): Exercise[] => {
  return ids.map((id) => getExerciseById(id)).filter(Boolean) as Exercise[];
};
