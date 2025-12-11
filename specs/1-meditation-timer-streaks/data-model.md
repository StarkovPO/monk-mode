# Data Model

## Entities

### Lesson
- id: string
- title: string
- summary: string
- content: string

### Exercise
- id: string
- name: string
- defaultDurationSec: number
- reminderText: string

### Preset
- id: 'beginner' | 'experienced' | 'advanced'
- label: string
- exerciseIds: string[] (ordered)
- totalExpectedDurationSec: number

### SessionRun
- id: string (uuid)
- presetId: Preset['id']
- startTimeLocalISO: string
- endTimeLocalISO?: string
- stepsCompleted: number
- totalElapsedSec: number

### Streaks
- totalDays: number
- currentStreak: number
- longestStreak: number
- lastCreditedDateLocal?: string (YYYY-MM-DD)

## Persistence (AsyncStorage keys)
- app.streaks: Streaks
- app.lastSession: Partial<SessionRun>
- app.settings: { soundEnabled: boolean }
- app.lessons: Lesson[] (mocked, bundled; not required to persist)

## Relationships
- Preset references Exercises by id.
- SessionRun references Preset by id and counts completed steps.
- Streaks independent; updated on session start based on local date.
