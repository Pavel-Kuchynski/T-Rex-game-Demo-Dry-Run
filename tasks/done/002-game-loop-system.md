# GameLoopSystem

## ID
002

## Priority
High

## Status
done

## Description
Implement `GameLoopSystem` using `requestAnimationFrame` to drive the main update-render cycle. The system must calculate delta time, enforce a maximum delta cap, and integrate with the state machine so the loop behaves correctly in menu, running, and gameOver states.

## Acceptance Criteria
- [x] `GameLoopSystem` class exists in `src/systems/GameLoopSystem.js`
- [x] `start()` begins the `requestAnimationFrame` loop; calling `start()` twice does not create duplicate loops
- [x] `stop()` cancels the animation frame and halts the loop
- [x] `reset()` stops the loop and clears all accumulated timing state
- [x] Delta time is calculated as `(currentTimestamp - lastTimestamp) / 1000` (seconds)
- [x] Delta time is capped at `0.05s` (50 ms) to prevent spiral-of-death on tab blur/resume
- [x] The loop calls registered update callbacks with `(deltaTime)` and registered render callbacks with no arguments, in order: update → render
- [x] `GameLoopSystem` accepts a `stateManager` reference and skips physics update callbacks when state is `menu` or `gameOver` (render callbacks always run)
- [x] A frame counter and total elapsed time accumulator are exposed via `getElapsedTime()` and `getFrameCount()`

## Technical Notes
- Store the `requestAnimationFrame` handle in a private field to allow clean cancellation.
- The loop signature should be: `loop(timestamp)` — bound to `this` to avoid context loss.
- Delta cap prevents huge position jumps if the user switches tabs or the browser throttles.
- Update callbacks and render callbacks should be stored in separate arrays so they can be iterated independently.
- Do not couple `GameLoopSystem` to any specific system — use a callback registration pattern: `onUpdate(fn)` / `onRender(fn)`.

## Dependencies
001

## Estimated Effort
M
