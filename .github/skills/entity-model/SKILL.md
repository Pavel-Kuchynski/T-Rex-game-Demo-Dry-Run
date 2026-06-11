---
name : entity-model
description: Define a pure data entity model for the T-Rex Runner game, separating data from
---
# Entity Model Skill (MVP)

Entities are PURE DATA ONLY.

Allowed:
- position {x, y}
- velocity {x, y}
- size {w, h}
- state flags (isJumping, isAlive)

Forbidden:
- methods
- logic
- internal updates
- event handlers

Rule:
👉 All behavior belongs to systems, not entities