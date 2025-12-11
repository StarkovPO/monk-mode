export interface Preset {
  id: string;
  label: string;
  description: string;
  exerciseIds: string[];
  totalDurationMin: number;
}

export const presets: Preset[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: '3 exercises • ~15 minutes',
    exerciseIds: ['breath-awareness', 'body-scan', 'gratitude-practice'],
    totalDurationMin: 15,
  },
  {
    id: 'experienced',
    label: 'Experienced',
    description: '5 exercises • ~25 minutes',
    exerciseIds: [
      'breath-awareness',
      'body-scan',
      'loving-kindness',
      'sound-meditation',
      'gratitude-practice',
    ],
    totalDurationMin: 25,
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: '7 exercises • ~50 minutes',
    exerciseIds: [
      'breath-awareness',
      'body-scan',
      'loving-kindness',
      'sound-meditation',
      'visualization',
      'open-awareness',
      'heart-center',
    ],
    totalDurationMin: 50,
  },
];

export const getPresetById = (id: string): Preset | undefined => {
  return presets.find((preset) => preset.id === id);
};
