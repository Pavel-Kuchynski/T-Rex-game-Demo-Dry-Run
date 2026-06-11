# ObstacleSystem

## ID
008

## Priority
High

## Status
backlog

## Description
Implement `ObstacleSystem` that manages cactus spawning, movement, and despawning using an object pool. The pool eliminates per-frame garbage collection pressure and ensures stable 60 FPS over long sessions.

## Acceptance Criteria
- [ ] `ObstacleSystem` class exists in `src/systems/ObstacleSystem.js`
- [ ] On `init()`, a pool of `OBSTACLE_POOL_SIZE` (e.g. 10) `Cactus` instances is created; none are active
- [ ] `update(deltaTime, gameSpeed)` moves all active cacti left by `cactus.speed * deltaTime`
- [ ] Cacti that move fully off the left edge (`x + width < 0`) are deactivated and returned to the pool
- [ ] A spawn timer accumulates delta time; when it exceeds `spawnInterval`, a pooled cactus is activated at `x = CANVAS_WIDTH`, assigned a random variant, and the timer resets
- [ ] `spawnInterval` is set externally by `DifficultySystem` via `setSpawnInterval(ms)`
- [ ] `getActiveCacti()` returns an array of all currently active `Cactus` instances
- [ ] `reset()` deactivates all cacti and resets the spawn timer
- [ ] If no pooled cactus is available (all active), spawn is skipped silently (no allocation)

## Technical Notes
- Pool lookup: iterate the pool array and return the first entry where `active === false`.
- `spawnInterval` should have a default value (e.g. `1500ms`) used before `DifficultySystem` overrides it.
- `gameSpeed` parameter passed to `update` is the global speed scalar from `DifficultySystem`; multiply each cactus's base speed by it, or set `cactus.speed = baseSpeed * gameSpeed` on spawn.
- Randomise variant selection using `Math.random()` against a weighted array defined in constants.

## Dependencies
007

## Estimated Effort
M
