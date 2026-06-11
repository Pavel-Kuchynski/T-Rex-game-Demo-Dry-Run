# Game State Machine

## ID
013

## Priority
Medium

## Status
backlog

## Description
Implement a lightweight state machine module that owns all valid game states and their legal transitions. The module must dispatch events on transition so systems can react without being tightly coupled to each other.

## Acceptance Criteria
- [ ] `StateManager` class exists in `src/core/StateManager.js`
- [ ] Valid states are: `"menu"`, `"running"`, `"gameOver"` — defined as constants
- [ ] `getState()` returns the current state string
- [ ] `setState(newState)` transitions to the new state; throws (or logs a warning) if the transition is not in the allowed transition map
- [ ] Allowed transitions: `menu → running`, `running → gameOver`, `gameOver → running`
- [ ] `onTransition(fn)` registers a callback `fn(fromState, toState)` called synchronously on every valid transition
- [ ] Multiple transition listeners can be registered and all are called in registration order
- [ ] `reset()` sets state back to `"menu"` without firing transition callbacks (silent reset for restart)
- [ ] A Vitest test verifies: valid transitions succeed, invalid transition is rejected, callbacks fire with correct arguments

## Technical Notes
- Transition map as a plain object: `{ menu: ["running"], running: ["gameOver"], gameOver: ["running"] }`.
- Callbacks array should be cleared only if `destroy()` is called — persists across `reset()`.
- `setState` should be idempotent if called with the current state (no-op, no callback fire).
- `StateManager` must NOT import any game system — it is a pure utility used by all systems.

## Dependencies
001

## Estimated Effort
S
