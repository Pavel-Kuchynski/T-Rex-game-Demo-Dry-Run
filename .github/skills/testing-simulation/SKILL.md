---
name: testing-simulation
description: Implement simulation-based testing for the T-Rex Runner game, allowing deterministic verification of game
---

# Testing Simulation Skill (MVP)

Testing must be simulation-based:

- Run game loop frame-by-frame
- Use fixed delta time (e.g. 16ms)
- Inject inputs at specific frames
- Assert final state after N frames

DO NOT:
- test rendering
- use real-time delays
- depend on timing randomness

Always test:
- jump logic
- collision
- score progression
- state transitions