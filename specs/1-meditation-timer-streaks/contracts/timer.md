# Contract: TimerService

## Interface
```
start(preset: Preset, now = Date.now()): void
pause(now = Date.now()): void
resume(now = Date.now()): void
skipStep(now = Date.now()): void
cancel(): void
subscribe(listener: (state: TimerState) => void): () => void
```

## Types
```
type Step = { exerciseId: string; durationSec: number; index: number }

type TimerState = {
  status: 'idle' | 'running' | 'paused' | 'finished'
  currentStep?: Step
  remainingSec?: number
  stepIndex: number
  steps: Step[]
  startedAt?: number // ms epoch
  elapsedSec: number
}
```

## Behavior
- Auto-advance at step end; emit audio cue via AudioService hook.
- Use wall-clock deltas to compute elapsed; reconcile on resume.
- On cancel: status → idle; do not credit streak.
- On finish: status → finished; provide summary (elapsed, steps completed).
