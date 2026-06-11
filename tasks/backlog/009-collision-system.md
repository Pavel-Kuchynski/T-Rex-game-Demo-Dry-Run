# CollisionSystem

## ID
009

## Priority
High

## Status
backlog

## Description
Implement `CollisionSystem` using AABB intersection with a configurable hitbox shrink margin to make collisions feel fair. The system must be deterministic at high game speeds and immediately transition the game to `gameOver` on a confirmed hit.

## Acceptance Criteria
- [ ] `CollisionSystem` class exists in `src/systems/CollisionSystem.js`
- [ ] `update(trex, activeCacti, stateManager)` checks T-Rex against every active cactus
- [ ] AABB check: overlap on both axes → hit confirmed
- [ ] Hitboxes are inset by `HITBOX_MARGIN` (e.g. `6px`) on all sides before the intersection test
- [ ] On confirmed hit: `stateManager.setState("gameOver")` is called and `trex.state` is set to `"dead"`
- [ ] No hit is detected when rects are adjacent but not overlapping (edge case: `>` not `>=`)
- [ ] System is deterministic: produces same result for same inputs regardless of frame rate
- [ ] `HITBOX_MARGIN` is defined in `src/core/constants.js`
- [ ] A Vitest test (in `tests/collision.test.js`) verifies: clear miss, direct overlap hit, edge-adjacent no-hit, shrunk hitbox boundary

## Technical Notes
- Shrunk hitbox for T-Rex: `{ x: trex.x + M, y: trex.y + M, w: trex.width - 2M, h: trex.height - 2M }`.
- Shrunk hitbox for cactus: same margin applied.
- AABB formula: `ax < bx+bw && ax+aw > bx && ay < by+bh && ay+ah > by`.
- At high speeds a cactus may skip over the T-Rex in one frame — this is acceptable for MVP (sub-frame tunnelling is a post-MVP concern). Document this known limitation in the technical notes of the implementation.
- Do not modify any entity fields other than `trex.state` inside this system.

## Dependencies
004, 007, 013

## Estimated Effort
M
