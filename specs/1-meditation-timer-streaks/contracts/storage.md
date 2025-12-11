# Contract: Storage

## Interface
```
getItem<T>(key: string): Promise<T | null>
setItem<T>(key: string, value: T): Promise<void>
removeItem(key: string): Promise<void>
```

## Keys
- app.streaks
- app.lastSession
- app.settings
