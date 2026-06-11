# Game Over and Clean Restart

## ID
014

## Priority
Medium

## Status
backlog

## Description
Wire up the full game-over flow and a clean restart: when the player presses Space/Enter on the game-over screen all systems are reset to their initial state with zero leftover data — no stale obstacles, no carried-over score, no velocity.

## Acceptance Criteria
- [ ] Pressing Space or Enter while `gameState === "gameOver"` triggers a full restart sequence
- [ ] Restart sequence calls `reset()` on: `ScoreSystem`, `ObstacleSystem`, `DifficultySystem`, `PhysicsSystem` (clears T-Rex velocity/state), `Trex` entity, `Ground` entity
- [ ] After restart, `StateManager.setState("running")` is called — game immediately resumes
- [ ] After restart, no previously active cacti remain (all pool entries are `active: false`)
- [ ] After restart, score displayed in HUD is `0`
- [ ] After restart, T-Rex `velocityY` is `0`, `isGrounded` is `true`, `state` is `"running"`
- [ ] After restart, `DifficultySystem.getGameSpeed()` returns `1.0`
- [ ] The game-over overlay (from `RenderSystem`) is no longer drawn after restart
- [ ] `InputSystem.isRestartPressed()` is consumed (returns `false`) immediately after triggering the restart

## Technical Notes
- Restart logic should live in `src/main.js` inside the main update loop's `gameOver` branch — it orchestrates system resets, not any individual system.
- Order of reset operations: 1) ScoreSystem, 2) ObstacleSystem, 3) DifficultySystem, 4) Trex.reset(), 5) Ground.reset(), 6) StateManager.setState("running").
- Do not call `GameLoopSystem.stop()` on restart — the loop keeps running continuously.
- Confirm no event listeners are double-registered by ensuring `InputSystem.init()` is NOT called again on restart (it was already called once at startup).

## Dependencies
005, 008, 010, 011, 013

## Estimated Effort
M
