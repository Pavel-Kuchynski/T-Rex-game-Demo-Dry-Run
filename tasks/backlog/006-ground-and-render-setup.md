# Ground Entity and RenderSystem Stub

## ID
006

## Priority
High

## Status
backlog

## Description
Introduce the `Ground` entity with a scrolling x-offset and create a minimal `RenderSystem` stub that clears the canvas and draws the ground line each frame. This task also migrates the temporary T-Rex smoke render from Task 004 out of `main.js` and into `RenderSystem`.

## Acceptance Criteria
- [ ] `Ground` entity exists in `src/entities/Ground.js` with fields: `x` (scroll offset, default `0`), `width` (canvas width), `y` (ground baseline y), `speed` (pixels/sec, driven by `DifficultySystem` later)
- [ ] `Ground` has a `reset()` method that sets `x` back to `0`
- [ ] `RenderSystem` class exists in `src/systems/RenderSystem.js`
- [ ] `RenderSystem.render(ctx, gameState, entities)` clears the canvas with `ctx.clearRect`
- [ ] `RenderSystem` draws a horizontal ground line at `GROUND_Y` across the full canvas width
- [ ] `RenderSystem` draws the T-Rex as a filled rectangle (placeholder) at its current `x`, `y`, `width`, `height`
- [ ] The canvas context (`ctx`) is obtained from the canvas element in `src/main.js` and passed into the render system — `RenderSystem` does NOT query the DOM itself
- [ ] Any direct T-Rex draw code added in Task 004 is removed from `src/main.js` and replaced by `RenderSystem.render(...)`
- [ ] Running `npm run dev` shows a canvas with a ground line and a rectangle (T-Rex placeholder) visible

## Technical Notes
- `Ground.x` scrolls leftward each frame: `ground.x = (ground.x - ground.speed * deltaTime) % ground.width` — this creates a seamless loop.
- `RenderSystem` must contain zero game logic — no velocity, no collision, no state transitions.
- Ground line can be drawn with `ctx.fillRect(0, GROUND_Y + TREX_HEIGHT, CANVAS_WIDTH, 2)`.
- `GROUND_HEIGHT` constant in `src/core/constants.js` defines the thickness/baseline offset.

## Dependencies
001, 004

## Estimated Effort
S
