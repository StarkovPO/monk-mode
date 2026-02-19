export interface Preset {
  id: string;
  labelKey: string;
  descriptionKey: string;
  exerciseIds: string[];
  totalDurationMin: number;
}

export const presets: Preset[] = [
  {
    id: 'beginner',
    labelKey: 'presets.beginner.label',
    descriptionKey: 'presets.beginner.description',
    exerciseIds: ['entering-meditation', 'breath-counting', 'clear-comprehension'],
    totalDurationMin: 15,
  },
  {
    id: 'experienced',
    labelKey: 'presets.experienced.label',
    descriptionKey: 'presets.experienced.description',
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
    labelKey: 'presets.advanced.label',
    descriptionKey: 'presets.advanced.description',
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
