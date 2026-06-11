---
name: Collision Detection
description: Implement a robust collision detection system using swept AABB for the T-Rex Runner game
agent: game-developer
---
# Collision Skill (MVP)

Collision system rules (NORMATIVE):

- Use AABB (axis-aligned bounding boxes) as the canonical bounding shape.
- Implement continuous collision detection for moving rectangles (swept AABB) so that high-speed "tunneling" is prevented.
- Deterministic: given the same inputs (positions, sizes, velocities, dt) the result must be identical across runs and platforms.
- Must not depend on frame rate. All checks should operate over an explicit timestep `dt` (seconds) supplied by the GameLoop.

Critical requirements:

- Must detect collisions for fast-moving objects reliably (no missed collisions when an object would cross an obstacle within a single frame).
- Must treat edge contact as collision (touching edges counts as a collision).
- Must support moving vs. static and moving vs. moving rectangles. For two moving objects, use relative velocity and treat one object as static.

Authoritative algorithm (required):

1. For each pair (A, B) where A is the potentially moving object:
   - Compute relative velocity v_rel = vA - vB (in pixels/second).
   - Use swept AABB to compute time of impact t in normalized [0,1] over the current frame where movement = v_rel * dt.
   - If initial overlap exists (A and B overlap at t=0), return collision with t = 0.
   - If swept AABB reports a hit with entry time t in [0,1], this is a collision within the frame. Report hit=true and t.
   - Otherwise, no collision for this pair in this frame.

2. When a collision is detected at time t, resolve by moving the object to the impact position: pos = pos_start + v * (t * dt) and then resolve the velocity/penetration according to the game rules (stop horizontal movement for cactus collision, bounce/adjust for other mechanics as needed).

Pseudocode (swept AABB outline):

```
function sweptAABB(movingRect, vRel, staticRect, dt) -> { hit: boolean, t: number, nx: int, ny: int }
  // If vRel is zero -> fallback to AABB overlap check
  // Compute expanded entry/exit distances based on direction of motion
  // Convert to entry/exit times by dividing by (vRel * dt)
  // entryTime = max(entry.x, entry.y)
  // exitTime  = min(exit.x, exit.y)
  // if entryTime > exitTime or entryTime > 1 or exitTime < 0 -> no hit
  // hit at t = clamp(entryTime, 0, 1) with normal based on which axis produced entryTime
```

Edge rules and tie-breaking (deterministic):

- Edge-touching counts as collision and should produce t within [0,1] (not treated as miss).
- If entry times on X and Y are equal (simultaneous), break ties consistently by preferring the axis with the larger absolute relative velocity component.
- If both velocities are zero and rectangles overlap -> hit with t=0.

Test vectors (required acceptance cases):

1) High-speed horizontal tunneling (must detect)
   - moving = { x: 0, y: 0, w: 10, h: 10 }
   - vA = { vx: 2000, vy: 0 } // px/s
   - static = { x: 90, y: 0, w: 10, h: 10 }
   - dt = 1/60
   - Expected: hit=true, t in (0,1)

2) Edge contact (touching) counts as collision
   - moving = { x: 0, y: 0, w: 10, h: 10 }
   - vA = { vx: 80, vy: 0 }
   - static = { x: 90, y: 0, w: 10, h: 10 }
   - dt chosen so that mover ends exactly touching static at frame end
   - Expected: hit=true (either t==1 or a t such that final positions touch)

3) Stationary overlap (initial penetration)
   - moving = { x: 5, y: 0, w: 10, h: 10 }
   - vA = { vx: 0, vy: 0 }
   - static = { x: 10, y: 0, w: 10, h: 10 }
   - dt = any
   - Expected: hit=true, t=0

4) Two moving objects (relative velocity) - crossing
   - A: { x: 0, y: 0, w: 10, h: 10 }, vA={vx:1000,vy:0}
   - B: { x: 150, y: 0, w: 10, h: 10 }, vB={vx:-1000,vy:0}
   - dt = 1/60
   - Expected: hit=true (relative velocity causes overlap)

5) No collision when paths miss
   - moving passes above/below static without touching - expected hit=false

Unit test guidance

- Implement automated tests that construct these vectors and assert the expected boolean and that t is within [0,1] when hit=true.
- Name tests to reference the skill, e.g. `tests/Collision.skill.test.js` or `tests/Collision.test.js` with a header linking to this skill file.

Performance considerations

- Swept tests per moving object against all relevant static obstacles are O(n*m); use spatial partitioning (buckets/grid) to limit pairs tested in large obstacle counts.
- Avoid per-frame memory allocations: reuse temporary objects and vectors.

Notes

- This skill file is normative for collision behavior. Implementations MUST follow the prescribed swept-AABB approach (or an equivalent conservative continuous detection algorithm) and include the acceptance tests above. If a different algorithm is chosen, update this skill and tests accordingly.

