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
    description: '15-Minute Block (Basic Level or Express Practice)',
    exerciseIds: ['anapanasati-basic'],
    totalDurationMin: 15,
  },
  {
    id: 'experienced',
    label: 'Experienced',
    description: '30-Minute Block (Confident Practice / Intermediate Level)',
    exerciseIds: ['anapanasati-intermediate'],
    totalDurationMin: 30,
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: '60-Minute Block (Deep Dive / Advanced Level)',
    exerciseIds: ['anapanasati-advanced'],
    totalDurationMin: 60,
  },
];

export const getPresetById = (id: string): Preset | undefined => {
  return presets.find((preset) => preset.id === id);
};
