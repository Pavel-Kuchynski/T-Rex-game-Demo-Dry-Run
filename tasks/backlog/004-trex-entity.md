# Trex Entity + Visual Smoke Check

## ID
004

## Priority
High

## Status
backlog

## Description
Define the `Trex` passive data entity that holds all state the T-Rex character needs. No logic lives here — the entity is a plain data container consumed and mutated by systems. To make progress visible at this stage, Task 004 also includes a minimal smoke render in `main.js` so a placeholder T-Rex rectangle is shown on screen immediately after this task is implemented.

## Acceptance Criteria
- [ ] `Trex` class (or factory function) exists in `src/entities/Trex.js`
- [ ] Instance exposes: `x`, `y`, `width`, `height` (numbers, set to sensible MVP defaults)
- [ ] Instance exposes: `velocityY` (number, default `0`)
- [ ] Instance exposes: `isGrounded` (boolean, default `true`)
- [ ] Instance exposes: `state` (string enum: `"running"` | `"jumping"` | `"dead"`, default `"running"`)
- [ ] Instance exposes: `animationFrame` (integer, default `0`) for sprite cycling
- [ ] Instance exposes: `animationTimer` (number, default `0`) for frame timing
- [ ] A `reset()` method restores all fields to their initial default values
- [ ] Default position places the T-Rex on the ground line (y = CANVAS_HEIGHT - GROUND_HEIGHT - height)
- [ ] Width and height constants are defined in `src/core/constants.js` (e.g. `TREX_WIDTH = 44`, `TREX_HEIGHT = 48`)
- [ ] `src/main.js` instantiates a `Trex` entity and draws a placeholder rectangle using the entity's `x`, `y`, `width`, `height`
- [ ] Running `npm run dev` shows a visible T-Rex placeholder rectangle on canvas after Task 004 alone

## Technical Notes
- The entity must NOT import or call any system.
- Ground baseline and T-Rex dimensions should come from `src/core/constants.js`, not be hardcoded in the entity file.
- `state` field is read by `RenderSystem` to decide which sprite/rectangle color to draw.
- Keep `reset()` in sync with the constructor — consider extracting initial values to a `_defaults` object.
- The draw in `main.js` is a temporary smoke check only; Task 006 must migrate this rendering into `RenderSystem`.

## Dependencies
001

## Estimated Effort
S
