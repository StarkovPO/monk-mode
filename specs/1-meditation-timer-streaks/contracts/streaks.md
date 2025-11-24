# Contract: StreakService

## Interface
```
recordSessionStart(date: Date): Promise<void>
getStreaks(): Promise<Streaks>
reset(): Promise<void>
```

## Behavior
- Credit day once per local calendar day at first session start.
- Update current and longest streaks; maintain total days.
- Persist to AsyncStorage key `app.streaks`.
