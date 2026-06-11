# Unit Test Suite

## ID
015

## Priority
High

## Status
backlog

## Description
Implement a comprehensive Vitest test suite covering all critical gameplay systems via deterministic simulation. Tests must run headlessly (no browser) and complete in under 5 seconds to support fast CI feedback.

## Acceptance Criteria
- [ ] `tests/physics.test.js`: jump applies negative velocityY to grounded T-Rex
- [ ] `tests/physics.test.js`: double jump is rejected when `trex.isGrounded === false`
- [ ] `tests/physics.test.js`: gravity increases velocityY each frame
- [ ] `tests/physics.test.js`: T-Rex y is clamped to GROUND_Y and `isGrounded` is set `true` on landing
- [ ] `tests/collision.test.js`: non-overlapping rects return no collision
- [ ] `tests/collision.test.js`: overlapping rects trigger `stateManager.setState("gameOver")`
- [ ] `tests/collision.test.js`: edge-adjacent rects (touching but not overlapping) return no collision
- [ ] `tests/collision.test.js`: hitbox margin reduces effective collision area
- [ ] `tests/score.test.js`: `update(deltaTime)` increments score proportionally to elapsed time
- [ ] `tests/score.test.js`: `reset()` returns `getScore()` to `0`
- [ ] `tests/score.test.js`: milestone callback fires once when score crosses 100
- [ ] `tests/score.test.js`: milestone callback does NOT fire again until next 100-point boundary
- [ ] `tests/states.test.js`: valid transition `menu → running` succeeds and fires callback
- [ ] `tests/states.test.js`: invalid transition `menu → gameOver` is rejected
- [ ] `tests/states.test.js`: `reset()` returns state to `"menu"` without firing callbacks
- [ ] `tests/restart.test.js`: after restart, all active cacti count is `0`
- [ ] `tests/restart.test.js`: after restart, score is `0`
- [ ] `tests/restart.test.js`: after restart, `trex.velocityY === 0` and `trex.isGrounded === true`
- [ ] `npm run test` passes all tests with exit code `0`
- [ ] Total test suite runtime is under `5 seconds`

## Technical Notes
- Use Vitest's `describe`/`it`/`expect` API throughout.
- For physics tests: instantiate `Trex` and `PhysicsSystem` directly; create a mock `InputSystem` object with a controllable `isJumpPressed()` return value.
- For collision tests: construct plain rect objects matching the AABB interface; pass a mock `stateManager` with a jest-spy equivalent (`vi.fn()`).
- For restart tests: run the full reset sequence (as defined in task 014) and assert entity/system state afterward — no DOM or canvas required.
- All tests must be pure unit tests: no `requestAnimationFrame`, no canvas context, no real timers. Use `vi.useFakeTimers()` if any timing is needed.
- Import paths must use the same aliases configured in `vitest.config.js`.

## Dependencies
005, 009, 010, 013, 014

## Estimated Effort
L
