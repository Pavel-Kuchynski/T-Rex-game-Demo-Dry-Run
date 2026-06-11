# ScoreSystem

## ID
010

## Priority
High

## Status
backlog

## Description
Implement `ScoreSystem` that tracks player score as a function of survival time (not frame count), emits milestone events every 100 points, and exposes a clean API for querying and resetting score.

## Acceptance Criteria
- [ ] `ScoreSystem` class exists in `src/systems/ScoreSystem.js`
- [ ] `update(deltaTime)` increments an internal score accumulator: `score += SCORE_RATE * deltaTime`
- [ ] `getScore()` returns the current score as a floored integer
- [ ] `reset()` sets the score accumulator back to `0`
- [ ] `SCORE_RATE` (points per second) is defined in `src/core/constants.js` (suggested: `10`)
- [ ] Every time the floored score crosses a multiple of `100`, a milestone callback is invoked (if registered)
- [ ] `onMilestone(fn)` registers a callback `fn(score)` called at each 100-point milestone
- [ ] Score does NOT increment when game state is `menu` or `gameOver` (enforced by only calling `update` inside the running-state branch in `main.js`)
- [ ] A Vitest test verifies: score increments over time, `reset()` zeroes score, milestone fires at 100/200/300

## Technical Notes
- Store score as a float internally; expose integer via `getScore()` using `Math.floor`.
- Milestone detection: compare `Math.floor(newScore / 100)` vs `Math.floor(oldScore / 100)` each frame.
- `SCORE_RATE = 10` means the player earns 10 pts/sec, reaching 100 at ~10 seconds — tune as needed.
- Do NOT read game state inside `ScoreSystem` — the caller (main loop) is responsible for only calling `update` at the right times.

## Dependencies
001

## Estimated Effort
S
