# InputSystem

## ID
003

## Priority
High

## Status
done

## Description
Implement `InputSystem` that listens to keyboard events and exposes a clean, debounced jump-intent API. The system must guarantee that one physical keypress produces exactly one jump signal, preventing jump spam from held keys.

## Acceptance Criteria
- [x] `InputSystem` class exists in `src/systems/InputSystem.js`
- [x] `init()` attaches `keydown` and `keyup` event listeners to `window`
- [x] `destroy()` removes all attached event listeners (no memory leaks)
- [x] `isJumpPressed()` returns `true` exactly once per physical key press of Space or ArrowUp
- [x] Holding Space or ArrowUp does NOT repeatedly return `true` from `isJumpPressed()`
- [x] `isJumpPressed()` returns `false` after being consumed (auto-reset after read)
- [x] `isRestartPressed()` returns `true` once per press of Space or Enter (used on game-over screen)
- [x] Keydown events with `event.repeat === true` are ignored
- [x] The system handles both Space (`" "` / `"Space"`) and ArrowUp (`"ArrowUp"`) as jump keys

## Technical Notes
- Use an internal boolean flag `_jumpConsumed` that is set to `true` on keydown and flipped to `false` after `isJumpPressed()` reads it.
- Check `event.repeat` in the keydown handler to suppress browser key-repeat events.
- `destroy()` must use the exact same function references that were passed to `addEventListener` — store them as instance properties, not inline lambdas, to ensure proper removal.
- Do not track mouse or touch events in MVP.

## Dependencies
001

## Estimated Effort
S
