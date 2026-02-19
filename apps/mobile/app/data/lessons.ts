export interface Lesson {
  id: string;
  titleKey: string;
  summaryKey: string;
  contentKey: string;
  category: 'foundation' | 'stages' | 'obstacles' | 'reference';
}

export const lessons: Lesson[] = [
  // Foundation Category
  {
    id: '1',
    titleKey: 'lessons.anapanasati.title',
    summaryKey: 'lessons.anapanasati.summary',
    contentKey: 'lessons.anapanasati.content',
    category: 'foundation',
  },
  {
    id: '2',
    titleKey: 'lessons.posture.title',
    summaryKey: 'lessons.posture.summary',
    contentKey: 'lessons.posture.content',
    category: 'foundation',
  },
  {
    id: '3',
    titleKey: 'lessons.mudras.title',
    summaryKey: 'lessons.mudras.summary',
    contentKey: 'lessons.mudras.content',
    category: 'foundation',
  },

  // Stages Category
  {
    id: '4',
    titleKey: 'lessons.stage1.title',
    summaryKey: 'lessons.stage1.summary',
    contentKey: 'lessons.stage1.content',
    category: 'stages',
  },
  {
    id: '5',
    titleKey: 'lessons.stage2.title',
    summaryKey: 'lessons.stage2.summary',
    contentKey: 'lessons.stage2.content',
    category: 'stages',
  },
  {
    id: '6',
    titleKey: 'lessons.stage3.title',
    summaryKey: 'lessons.stage3.summary',
    contentKey: 'lessons.stage3.content',
    category: 'stages',
  },
  {
    id: '7',
    titleKey: 'lessons.stage4.title',
    summaryKey: 'lessons.stage4.summary',
    contentKey: 'lessons.stage4.content',
    category: 'stages',
  },
  {
    id: '8',
    titleKey: 'lessons.stage5.title',
    summaryKey: 'lessons.stage5.summary',
    contentKey: 'lessons.stage5.content',
    category: 'stages',
  },
  {
    id: '9',
    titleKey: 'lessons.stage6.title',
    summaryKey: 'lessons.stage6.summary',
    contentKey: 'lessons.stage6.content',
    category: 'stages',
  },

  // Obstacles Category
  {
    id: '10',
    titleKey: 'lessons.agitation.title',
    summaryKey: 'lessons.agitation.summary',
    contentKey: 'lessons.agitation.content',
    category: 'obstacles',
  },
  {
    id: '11',
    titleKey: 'lessons.lethargy.title',
    summaryKey: 'lessons.lethargy.summary',
    contentKey: 'lessons.lethargy.content',
    category: 'obstacles',
  },

  // Reference Category
  {
    id: '12',
    titleKey: 'lessons.glossary.title',
    summaryKey: 'lessons.glossary.summary',
    contentKey: 'lessons.glossary.content',
    category: 'reference',
  },
];

export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find((lesson) => lesson.id === id);
};

export const getLessonsByCategory = (category: Lesson['category']): Lesson[] => {
  return lessons.filter((lesson) => lesson.category === category);
};
