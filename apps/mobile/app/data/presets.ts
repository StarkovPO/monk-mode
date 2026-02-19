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
    description: '15-Minute Block (Basic Level or Express Practice) • 3 exercises',
    exerciseIds: ['entering-meditation', 'breath-counting', 'clear-comprehension'],
    totalDurationMin: 15,
  },
  {
    id: 'experienced',
    label: 'Experienced',
    description: '30-Minute Block (Confident Practice / Intermediate Level) • 5 exercises',
    exerciseIds: [
      'entering-intermediate',
      'counting-intermediate',
      'comprehension-intermediate',
      'mindfulness-flow',
      'observing-reactions',
    ],
    totalDurationMin: 30,
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: '60-Minute Block (Deep Dive / Advanced Level) • 7 exercises',
    exerciseIds: [
      'entering-advanced',
      'counting-advanced',
      'comprehension-advanced',
      'mindfulness-advanced',
      'observing-advanced',
      'equanimity-advanced',
      'concentration-advanced',
    ],
    totalDurationMin: 60,
  },
];

export const getPresetById = (id: string): Preset | undefined => {
  return presets.find((preset) => preset.id === id);
};
