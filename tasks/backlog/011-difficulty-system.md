# DifficultySystem

## ID
011

## Priority
High

## Status
backlog

## Description
Implement `DifficultySystem` that gradually increases global game speed and cactus spawn frequency as the player survives longer. Difficulty is driven by a config table so thresholds are easily tunable without changing logic.

## Acceptance Criteria
- [ ] `DifficultySystem` class exists in `src/systems/DifficultySystem.js`
- [ ] `update(elapsedTime)` reads the config table and sets `gameSpeed` and `spawnInterval` based on the current elapsed time bucket
- [ ] `getGameSpeed()` returns the current speed multiplier (float, starts at `1.0`)
- [ ] `getSpawnInterval()` returns the current spawn interval in milliseconds
- [ ] Config table is defined in `src/core/constants.js` as `DIFFICULTY_TABLE`: array of `{ timeThreshold, gameSpeed, spawnInterval }` entries, sorted ascending by `timeThreshold`
- [ ] `reset()` resets `elapsedTime` tracking and reverts speed/interval to initial values
- [ ] `DifficultySystem` calls `obstacleSystem.setSpawnInterval(ms)` when interval changes
- [ ] At least 5 difficulty tiers are defined in `DIFFICULTY_TABLE` covering 0–120 seconds of play
- [ ] A Vitest test verifies correct tier selection at t=0, t=30, t=60, t=90, t=120

## Technical Notes
- Suggested table: `[{t:0, speed:1.0, interval:1500}, {t:20, speed:1.2, interval:1300}, {t:40, speed:1.5, interval:1100}, {t:70, speed:1.8, interval:900}, {t:100, speed:2.2, interval:700}]`.
- Tier selection: iterate table in reverse and return the first entry where `elapsedTime >= timeThreshold`.
- `DifficultySystem` should receive `obstacleSystem` via constructor injection (not import), keeping coupling explicit.
- Only update `ObstacleSystem` when the tier actually changes (compare previous tier index) to avoid redundant calls.

## Dependencies
008

## Estimated Effort
S
