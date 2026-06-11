# PhysicsSystem — Jump Mechanic

## ID
005

## Priority
High

## Status
backlog

## Description
Implement `PhysicsSystem` that applies gravity to the T-Rex every frame and processes jump impulse from `InputSystem`. The system must enforce ground clamping and strictly prevent double jumps, as these are core gameplay correctness requirements.

## Acceptance Criteria
- [ ] `PhysicsSystem` class exists in `src/systems/PhysicsSystem.js`
- [ ] `update(deltaTime, trex, inputSystem)` applies gravity: `trex.velocityY += GRAVITY * deltaTime`
- [ ] `update` integrates velocity: `trex.y += trex.velocityY * deltaTime`
- [ ] When `inputSystem.isJumpPressed()` returns `true` AND `trex.isGrounded === true`, a negative `JUMP_VELOCITY` is applied to `trex.velocityY`
- [ ] Double jump is prevented: jump input is ignored when `trex.isGrounded === false`
- [ ] When `trex.y >= GROUND_Y`, `trex.y` is clamped to `GROUND_Y`, `trex.velocityY` is set to `0`, and `trex.isGrounded` is set to `true`
- [ ] `trex.state` is set to `"jumping"` on jump initiation and `"running"` on landing
- [ ] `GRAVITY` and `JUMP_VELOCITY` constants are defined in `src/core/constants.js`
- [ ] A Vitest test (in `tests/physics.test.js`) verifies: jump applies velocity, double jump is blocked, landing clamps position and resets `isGrounded`

## Technical Notes
- Recommended values: `GRAVITY = 2000` (px/s²), `JUMP_VELOCITY = -700` (px/s) — tunable from constants.
- `GROUND_Y` = `CANVAS_HEIGHT - GROUND_HEIGHT - TREX_HEIGHT` must match the T-Rex default spawn y.
- Do not read `inputSystem` directly in the entity — always pass it as a parameter to `update()`.
- The physics update must run before collision detection each frame.

## Dependencies
003, 004

## Estimated Effort
M
