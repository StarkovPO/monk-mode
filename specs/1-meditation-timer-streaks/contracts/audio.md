# Contract: AudioService

## Interface
```
loadCue(): Promise<void>
playCue(): Promise<void>
unload(): Promise<void>
setEnabled(enabled: boolean): void
```

## Behavior
- Preload short beep sound at session start.
- On step end, `playCue()`; if audio blocked, fail gracefully.
- Respect settings (sound enabled/disabled).
