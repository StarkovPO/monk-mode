export interface MeditationStage {
  nameKey: string;
  durationRangeKey: string;
  techniqueKey: string;
  order: number;
}

export interface Exercise {
  id: string;
  nameKey: string;
  durationSec: number;
  reminderTextKey: string;
  stages?: MeditationStage[];
  blockLevel?: 'basic' | 'intermediate' | 'advanced';
  descriptionKey?: string;
}

export const exercises: Exercise[] = [
  // Beginner Level - 15 minutes total (3 exercises of 5 min each)
  {
    id: 'entering-meditation',
    nameKey: 'exercises.enteringMeditation.name',
    durationSec: 120, // 2 minutes
    reminderTextKey: 'exercises.enteringMeditation.reminder',
    blockLevel: 'basic',
    descriptionKey: 'exercises.enteringMeditation.description',
    stages: [
      {
        nameKey: 'exercises.enteringMeditation.stages.scanning.name',
        durationRangeKey: 'exercises.enteringMeditation.stages.scanning.duration',
        techniqueKey: 'exercises.enteringMeditation.stages.scanning.technique',
        order: 1,
      },
    ],
  },
  {
    id: 'breath-counting',
    nameKey: 'exercises.breathCounting.name',
    durationSec: 420, // 7 minutes
    reminderTextKey: 'exercises.breathCounting.reminder',
    blockLevel: 'basic',
    descriptionKey: 'exercises.breathCounting.description',
    stages: [
      {
        nameKey: 'exercises.breathCounting.stages.counting.name',
        durationRangeKey: 'exercises.breathCounting.stages.counting.duration',
        techniqueKey: 'exercises.breathCounting.stages.counting.technique',
        order: 1,
      },
    ],
  },
  {
    id: 'clear-comprehension',
    nameKey: 'exercises.clearComprehension.name',
    durationSec: 378, // 6.3 minutes (total 15 min)
    reminderTextKey: 'exercises.clearComprehension.reminder',
    blockLevel: 'basic',
    descriptionKey: 'exercises.clearComprehension.description',
    stages: [
      {
        nameKey: 'exercises.clearComprehension.stages.labeling.name',
        durationRangeKey: 'exercises.clearComprehension.stages.labeling.duration',
        techniqueKey: 'exercises.clearComprehension.stages.labeling.technique',
        order: 1,
      },
      {
        nameKey: 'exercises.clearComprehension.stages.wordless.name',
        durationRangeKey: 'exercises.clearComprehension.stages.wordless.duration',
        techniqueKey: 'exercises.clearComprehension.stages.wordless.technique',
        order: 2,
      },
    ],
  },

  // Intermediate Level - 30 minutes total
  {
    id: 'entering-intermediate',
    nameKey: 'exercises.enteringIntermediate.name',
    durationSec: 120, // 2 minutes
    reminderTextKey: 'exercises.enteringIntermediate.reminder',
    blockLevel: 'intermediate',
    descriptionKey: 'exercises.enteringIntermediate.description',
    stages: [
      {
        nameKey: 'exercises.enteringIntermediate.stages.settling.name',
        durationRangeKey: 'exercises.enteringIntermediate.stages.settling.duration',
        techniqueKey: 'exercises.enteringIntermediate.stages.settling.technique',
        order: 1,
      },
    ],
  },
  {
    id: 'counting-intermediate',
    nameKey: 'exercises.countingIntermediate.name',
    durationSec: 480, // 8 minutes
    reminderTextKey: 'exercises.countingIntermediate.reminder',
    blockLevel: 'intermediate',
    descriptionKey: 'exercises.countingIntermediate.description',
    stages: [
      {
        nameKey: 'exercises.countingIntermediate.stages.structured.name',
        durationRangeKey: 'exercises.countingIntermediate.stages.structured.duration',
        techniqueKey: 'exercises.countingIntermediate.stages.structured.technique',
        order: 1,
      },
    ],
  },
  {
    id: 'comprehension-intermediate',
    nameKey: 'exercises.comprehensionIntermediate.name',
    durationSec: 420, // 7 minutes
    reminderTextKey: 'exercises.comprehensionIntermediate.reminder',
    blockLevel: 'intermediate',
    descriptionKey: 'exercises.comprehensionIntermediate.description',
    stages: [
      {
        nameKey: 'exercises.comprehensionIntermediate.stages.labelingSilent.name',
        durationRangeKey: 'exercises.comprehensionIntermediate.stages.labelingSilent.duration',
        techniqueKey: 'exercises.comprehensionIntermediate.stages.labelingSilent.technique',
        order: 1,
      },
    ],
  },
  {
    id: 'mindfulness-flow',
    nameKey: 'exercises.mindfulnessFlow.name',
    durationSec: 420, // 7 minutes
    reminderTextKey: 'exercises.mindfulnessFlow.reminder',
    blockLevel: 'intermediate',
    descriptionKey: 'exercises.mindfulnessFlow.description',
    stages: [
      {
        nameKey: 'exercises.mindfulnessFlow.stages.continuousFlow.name',
        durationRangeKey: 'exercises.mindfulnessFlow.stages.continuousFlow.duration',
        techniqueKey: 'exercises.mindfulnessFlow.stages.continuousFlow.technique',
        order: 1,
      },
    ],
  },
  {
    id: 'observing-reactions',
    nameKey: 'exercises.observingReactions.name',
    durationSec: 360, // 6 minutes (total 30 min)
    reminderTextKey: 'exercises.observingReactions.reminder',
    blockLevel: 'intermediate',
    descriptionKey: 'exercises.observingReactions.description',
    stages: [
      {
        nameKey: 'exercises.observingReactions.stages.workingReactions.name',
        durationRangeKey: 'exercises.observingReactions.stages.workingReactions.duration',
        techniqueKey: 'exercises.observingReactions.stages.workingReactions.technique',
        order: 1,
      },
    ],
  },

  // Advanced Level - 60 minutes total
  {
    id: 'entering-advanced',
    nameKey: 'exercises.enteringAdvanced.name',
    durationSec: 180, // 3 minutes
    reminderTextKey: 'exercises.enteringAdvanced.reminder',
    blockLevel: 'advanced',
    descriptionKey: 'exercises.enteringAdvanced.description',
    stages: [
      {
        nameKey: 'exercises.enteringAdvanced.stages.completeEntry.name',
        durationRangeKey: 'exercises.enteringAdvanced.stages.completeEntry.duration',
        techniqueKey: 'exercises.enteringAdvanced.stages.completeEntry.technique',
        order: 1,
      },
    ],
  },
  {
    id: 'counting-advanced',
    nameKey: 'exercises.countingAdvanced.name',
    durationSec: 540, // 9 minutes
    reminderTextKey: 'exercises.countingAdvanced.reminder',
    blockLevel: 'advanced',
    descriptionKey: 'exercises.countingAdvanced.description',
    stages: [
      {
        nameKey: 'exercises.countingAdvanced.stages.extendedCounting.name',
        durationRangeKey: 'exercises.countingAdvanced.stages.extendedCounting.duration',
        techniqueKey: 'exercises.countingAdvanced.stages.extendedCounting.technique',
        order: 1,
      },
    ],
  },
  {
    id: 'comprehension-advanced',
    nameKey: 'exercises.comprehensionAdvanced.name',
    durationSec: 540, // 9 minutes
    reminderTextKey: 'exercises.comprehensionAdvanced.reminder',
    blockLevel: 'advanced',
    descriptionKey: 'exercises.comprehensionAdvanced.description',
    stages: [
      {
        nameKey: 'exercises.comprehensionAdvanced.stages.deepComprehension.name',
        durationRangeKey: 'exercises.comprehensionAdvanced.stages.deepComprehension.duration',
        techniqueKey: 'exercises.comprehensionAdvanced.stages.deepComprehension.technique',
        order: 1,
      },
    ],
  },
  {
    id: 'mindfulness-advanced',
    nameKey: 'exercises.mindfulnessAdvanced.name',
    durationSec: 540, // 9 minutes
    reminderTextKey: 'exercises.mindfulnessAdvanced.reminder',
    blockLevel: 'advanced',
    descriptionKey: 'exercises.mindfulnessAdvanced.description',
    stages: [
      {
        nameKey: 'exercises.mindfulnessAdvanced.stages.perfectPresent.name',
        durationRangeKey: 'exercises.mindfulnessAdvanced.stages.perfectPresent.duration',
        techniqueKey: 'exercises.mindfulnessAdvanced.stages.perfectPresent.technique',
        order: 1,
      },
    ],
  },
  {
    id: 'observing-advanced',
    nameKey: 'exercises.observingAdvanced.name',
    durationSec: 540, // 9 minutes
    reminderTextKey: 'exercises.observingAdvanced.reminder',
    blockLevel: 'advanced',
    descriptionKey: 'exercises.observingAdvanced.description',
    stages: [
      {
        nameKey: 'exercises.observingAdvanced.stages.deepInvestigation.name',
        durationRangeKey: 'exercises.observingAdvanced.stages.deepInvestigation.duration',
        techniqueKey: 'exercises.observingAdvanced.stages.deepInvestigation.technique',
        order: 1,
      },
    ],
  },
  {
    id: 'equanimity-advanced',
    nameKey: 'exercises.equanimityAdvanced.name',
    durationSec: 600, // 10 minutes
    reminderTextKey: 'exercises.equanimityAdvanced.reminder',
    blockLevel: 'advanced',
    descriptionKey: 'exercises.equanimityAdvanced.description',
    stages: [
      {
        nameKey: 'exercises.equanimityAdvanced.stages.brakePedal.name',
        durationRangeKey: 'exercises.equanimityAdvanced.stages.brakePedal.duration',
        techniqueKey: 'exercises.equanimityAdvanced.stages.brakePedal.technique',
        order: 1,
      },
    ],
  },
  {
    id: 'concentration-advanced',
    nameKey: 'exercises.concentrationAdvanced.name',
    durationSec: 660, // 11 minutes (total 60 min)
    reminderTextKey: 'exercises.concentrationAdvanced.reminder',
    blockLevel: 'advanced',
    descriptionKey: 'exercises.concentrationAdvanced.description',
    stages: [
      {
        nameKey: 'exercises.concentrationAdvanced.stages.gasPedal.name',
        durationRangeKey: 'exercises.concentrationAdvanced.stages.gasPedal.duration',
        techniqueKey: 'exercises.concentrationAdvanced.stages.gasPedal.technique',
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
