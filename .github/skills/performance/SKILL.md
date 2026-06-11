---
name: performance
description: Follow performance best practices to ensure the T-Rex Runner game runs smoothly at 60 FPS in the browser, avoiding common pitfalls that can lead to frame drops or jank.
---

# Performance Skill (MVP)

Real-time constraints:

- No object creation inside game loop
- Reuse objects whenever possible
- Keep update() O(n) minimal
- Avoid heavy computations per frame
- Avoid garbage generation in hot paths

Target:
- stable 60 FPS in browser