---
name : game-loop
description: Implement a fixed update game loop for the T-Rex Runner game, ensuring strict separation
---
# Game Loop Skill (MVP)

Rules for all real-time logic:

- Game must run in a fixed update loop (~60 FPS)
- Separate update() and render() strictly
- All gameplay logic must happen in update()
- RenderSystem must only draw, never modify state
- No timers for core gameplay (no setTimeout for logic)

Update order:
1. Input
2. Systems update
3. Collision
4. State update
5. Render