# RenderSystem — Full Implementation

## ID
012

## Priority
Medium

## Status
backlog

## Description
Complete the `RenderSystem` to render all visible game elements each frame: scrolling ground, T-Rex placeholder, all active cacti, the HUD score, and a game-over overlay. The system must contain zero game logic — only draw calls.

## Acceptance Criteria
- [ ] `RenderSystem.render(ctx, gameState, entities, score)` is the single public render entry point
- [ ] Canvas is cleared with `ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)` at the start of every frame
- [ ] Ground is drawn as a filled rectangle using `ground.x` for seamless horizontal scroll (two tiles to cover full width)
- [ ] T-Rex is drawn as a filled rectangle; color changes based on `trex.state`: grey for running/jumping, red for dead
- [ ] Each active cactus is drawn as a dark-green filled rectangle at its `x`, `y`, `width`, `height`
- [ ] HUD score is drawn in the top-right corner using `ctx.fillText`, formatted as `"HI XXXXX"` padded to 5 digits
- [ ] When `gameState === "gameOver"`, a semi-transparent overlay is drawn with "GAME OVER" text centered on canvas
- [ ] When `gameState === "gameOver"`, a "Press Space to Restart" hint is drawn below the game-over text
- [ ] When `gameState === "menu"`, a "Press Space to Start" prompt is drawn centered on canvas
- [ ] No `if`/`else` branching on physics, speed, or score inside `RenderSystem` — all such values are passed in as parameters

## Technical Notes
- Two-tile ground scroll: draw `ground` rect at `x % CANVAS_WIDTH` and again at `(x % CANVAS_WIDTH) + CANVAS_WIDTH` to prevent gaps.
- Font settings: use `ctx.font = "bold 16px monospace"` for HUD; `ctx.font = "bold 24px monospace"` for overlays.
- `ctx.save()` / `ctx.restore()` around overlay to avoid contaminating global canvas state.
- Semi-transparent overlay: `ctx.fillStyle = "rgba(255,255,255,0.7)"` rect over full canvas before drawing overlay text.
- All color and font constants should live in `src/core/constants.js`.

## Dependencies
006, 007, 010, 013

## Estimated Effort
M
