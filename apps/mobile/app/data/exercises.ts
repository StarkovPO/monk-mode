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
  // Beginner Level - 15 minutes total (3 exercises of 5 min each)
  {
    id: 'entering-meditation',
    name: 'Entering Meditation',
    durationSec: 120, // 2 minutes
    reminderText: 'Close your eyes, straighten your spine, and scan your six senses.',
    blockLevel: 'basic',
    description: 'Transition into meditation by slowing down, scanning senses, and letting go of past and future.',
    stages: [
      {
        name: 'Scanning the Six Senses',
        durationRange: '1-2 minutes',
        technique: 'Observe sight (colors behind eyelids), hearing (sounds or silence), smell/taste, touch (pressure, temperature), and mind (thoughts, emotions). No verbalization, just observe.',
        order: 1,
      },
    ],
  },
  {
    id: 'breath-counting',
    name: 'Breath Counting',
    durationSec: 420, // 7 minutes
    reminderText: 'Count breath cycles: 1-10, 9-2, 3-8, 7-4, 5-6, end on 5.',
    blockLevel: 'basic',
    description: 'Stabilize attention using structured counting sequences.',
    stages: [
      {
        name: 'Counting Sequence',
        durationRange: '5-7 minutes',
        technique: 'Count: 1→10, 9→2, 3→8, 7→4, 5→6, end on 5. If distracted for >2 seconds, restart from 1. This anchors awareness to the breath.',
        order: 1,
      },
    ],
  },
  {
    id: 'clear-comprehension',
    name: 'Establishing Clear Comprehension',
    durationSec: 378, // 6.3 minutes (total 15 min)
    reminderText: 'Label "In/Out", then transition to wordless awareness of breath.',
    blockLevel: 'basic',
    description: 'Move from counting to labeling to pure awareness of breath sensations.',
    stages: [
      {
        name: 'Mental Labeling',
        durationRange: '3-4 minutes',
        technique: 'Mentally label "In" during inhalation, "Out" during exhalation. Keep attention on the breath.',
        order: 1,
      },
      {
        name: 'Wordless Awareness',
        durationRange: '2-3 minutes',
        technique: 'Drop all words. Simply feel the sensations of air passing through the nostrils with clear, silent awareness.',
        order: 2,
      },
    ],
  },

  // Intermediate Level - 30 minutes total
  {
    id: 'entering-intermediate',
    name: 'Entering Meditation',
    durationSec: 120, // 2 minutes
    reminderText: 'Scan your senses and settle into the present moment.',
    blockLevel: 'intermediate',
    description: 'Begin practice with sensory awareness and letting go.',
    stages: [
      {
        name: 'Scanning and Settling',
        durationRange: '1-2 minutes',
        technique: 'Scan the six senses, identify your current mood (agitated/lethargic/neutral), and let go of past and future.',
        order: 1,
      },
    ],
  },
  {
    id: 'counting-intermediate',
    name: 'Breath Counting',
    durationSec: 480, // 8 minutes
    reminderText: 'Count breath sequences with full attention.',
    blockLevel: 'intermediate',
    description: 'Stabilize mind through counting and tracking breath phases.',
    stages: [
      {
        name: 'Structured Counting',
        durationRange: '6-8 minutes',
        technique: 'Count sequences: 1→10, 9→2, 3→8, 7→4, 5→6. Track each phase: inhale, pause, exhale, pause.',
        order: 1,
      },
    ],
  },
  {
    id: 'comprehension-intermediate',
    name: 'Clear Comprehension',
    durationSec: 420, // 7 minutes
    reminderText: 'Label breaths, then observe in silence.',
    blockLevel: 'intermediate',
    description: 'Deepen awareness through labeling and wordless observation.',
    stages: [
      {
        name: 'Labeling and Silent Observation',
        durationRange: '5-7 minutes',
        technique: 'Label "In/Out" for a few minutes, then drop words and observe breath sensations with clear awareness.',
        order: 1,
      },
    ],
  },
  {
    id: 'mindfulness-flow',
    name: 'Establishing Mindfulness',
    durationSec: 420, // 7 minutes
    reminderText: 'Perceive experience as a continuous flow - "new, new, new".',
    blockLevel: 'intermediate',
    description: 'Establish awareness "in front of you" - meet each moment as it arrives.',
    stages: [
      {
        name: 'Continuous Flow Awareness',
        durationRange: '5-7 minutes',
        technique: 'Experience is like a conveyor belt. Meet each sensation (breath, thought, itch) as it arrives, then let it go. Don\'t look back or lean forward. "New, new, new".',
        order: 1,
      },
    ],
  },
  {
    id: 'observing-reactions',
    name: 'Observing the Mind',
    durationSec: 360, // 6 minutes (total 30 min)
    reminderText: 'Work with strong reactions using Big Mind perspective.',
    blockLevel: 'intermediate',
    description: 'Investigate and purify strong mental reactions.',
    stages: [
      {
        name: 'Working with Reactions',
        durationRange: '5-6 minutes',
        technique: 'If strong reactions arise (anger, obsession, pain), distance yourself (Big Mind), investigate with labels ("this is not me", "this is impermanent"), direct loving-kindness if needed.',
        order: 1,
      },
    ],
  },

  // Advanced Level - 60 minutes total
  {
    id: 'entering-advanced',
    name: 'Entering Meditation',
    durationSec: 180, // 3 minutes
    reminderText: 'Deep sensory scan and complete letting go.',
    blockLevel: 'advanced',
    description: 'Thorough entry into meditation with full awareness.',
    stages: [
      {
        name: 'Complete Entry Sequence',
        durationRange: '2-3 minutes',
        technique: 'Scan all six senses thoroughly. Investigate mood and tension. Explicitly declare meditation as your most important task. Let go completely.',
        order: 1,
      },
    ],
  },
  {
    id: 'counting-advanced',
    name: 'Breath Counting',
    durationSec: 540, // 9 minutes
    reminderText: 'Precise counting with full cycle tracking.',
    blockLevel: 'advanced',
    description: 'Deep stabilization through extended counting practice.',
    stages: [
      {
        name: 'Extended Counting Practice',
        durationRange: '8-9 minutes',
        technique: 'Count all sequences with precision. Track every phase of each breath. Restart if distracted >2 seconds. Build unshakeable stability.',
        order: 1,
      },
    ],
  },
  {
    id: 'comprehension-advanced',
    name: 'Clear Comprehension',
    durationSec: 540, // 9 minutes
    reminderText: 'From labeling to pure wordless awareness.',
    blockLevel: 'advanced',
    description: 'Establish crystal-clear awareness of breath.',
    stages: [
      {
        name: 'Deep Clear Comprehension',
        durationRange: '8-9 minutes',
        technique: 'Label "In/Out" until stable, then transition to wordless awareness. Feel every subtle sensation of air moving through nostrils.',
        order: 1,
      },
    ],
  },
  {
    id: 'mindfulness-advanced',
    name: 'Establishing Mindfulness',
    durationSec: 540, // 9 minutes
    reminderText: 'Second-by-second tracking of experience flow.',
    blockLevel: 'advanced',
    description: 'Perfect synchronicity with the present moment.',
    stages: [
      {
        name: 'Perfect Present Awareness',
        durationRange: '8-9 minutes',
        technique: 'Track experience second-by-second. Meet each moment exactly as it arrives on the "conveyor belt". Clarity, synchronicity, panoramicity.',
        order: 1,
      },
    ],
  },
  {
    id: 'observing-advanced',
    name: 'Observing the Mind',
    durationSec: 540, // 9 minutes
    reminderText: 'Purify hindrances with investigation.',
    blockLevel: 'advanced',
    description: 'Deep purification of mental patterns.',
    stages: [
      {
        name: 'Deep Investigation',
        durationRange: '8-9 minutes',
        technique: 'Use Big Mind to observe small mind. Investigate reactions thoroughly. Apply loving-kindness. Purify strong hindrances.',
        order: 1,
      },
    ],
  },
  {
    id: 'equanimity-advanced',
    name: 'Establishing Equanimity',
    durationSec: 600, // 10 minutes
    reminderText: 'Press the "brake pedal" - let go of craving.',
    blockLevel: 'advanced',
    description: 'Release all craving and rest in peace.',
    stages: [
      {
        name: 'Brake Pedal - Letting Go',
        durationRange: '9-10 minutes',
        technique: 'Let go of any craving away from the breath. Enjoy the peace, richness, and self-sufficiency of this moment. No grasping, no pushing away.',
        order: 1,
      },
    ],
  },
  {
    id: 'concentration-advanced',
    name: 'Establishing Concentration',
    durationSec: 660, // 11 minutes (total 60 min)
    reminderText: 'Press the "gas pedal" - gather mind fully on breath.',
    blockLevel: 'advanced',
    description: 'Deep concentration with complete breath tracking.',
    stages: [
      {
        name: 'Gas Pedal - Full Gathering',
        durationRange: '10-11 minutes',
        technique: 'Softly press the "gas pedal". Mind gathers completely around the breath. Track each inhale, pause, exhale, pause without any gaps or distractions.',
        order: 1,
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
