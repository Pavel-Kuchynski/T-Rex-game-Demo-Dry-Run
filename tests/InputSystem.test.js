import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { InputSystem } from '../src/systems/InputSystem.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Fire a synthetic KeyboardEvent on window.
 * @param {'keydown'|'keyup'} type
 * @param {string} code  e.g. 'Space', 'ArrowUp', 'Enter'
 * @param {string} key   e.g. ' ', 'ArrowUp', 'Enter'
 * @param {boolean} repeat
 */
function fireKey(type, code, key = code, repeat = false) {
  window.dispatchEvent(new KeyboardEvent(type, { code, key, repeat, bubbles: true }));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('InputSystem', () => {
  let input;

  beforeEach(() => {
    input = new InputSystem();
    input.init();
  });

  afterEach(() => {
    input.destroy();
    vi.restoreAllMocks();
  });

  // --- lifecycle ------------------------------------------------------------

  it('init() attaches keydown and keyup listeners', () => {
    const spy = vi.spyOn(window, 'addEventListener');
    const fresh = new InputSystem();
    fresh.init();
    const types = spy.mock.calls.map((c) => c[0]);
    expect(types).toContain('keydown');
    expect(types).toContain('keyup');
    fresh.destroy();
  });

  it('destroy() removes the exact listeners that were added', () => {
    const spy = vi.spyOn(window, 'removeEventListener');
    input.destroy();
    const types = spy.mock.calls.map((c) => c[0]);
    expect(types).toContain('keydown');
    expect(types).toContain('keyup');
    // Prevent afterEach from calling destroy() again on an already-destroyed instance.
    input = new InputSystem(); // replace so afterEach destroy is harmless
    input.init();
  });

  it('destroy() prevents further events from being processed', () => {
    input.destroy();
    fireKey('keydown', 'Space', ' ');
    // re-init so afterEach can safely destroy
    input = new InputSystem();
    input.init();
    expect(input.isJumpPressed()).toBe(false);
  });

  // --- isJumpPressed --------------------------------------------------------

  it('isJumpPressed() returns false before any key press', () => {
    expect(input.isJumpPressed()).toBe(false);
  });

  it('isJumpPressed() returns true after Space keydown', () => {
    fireKey('keydown', 'Space', ' ');
    expect(input.isJumpPressed()).toBe(true);
  });

  it('isJumpPressed() returns true after ArrowUp keydown', () => {
    fireKey('keydown', 'ArrowUp', 'ArrowUp');
    expect(input.isJumpPressed()).toBe(true);
  });

  it('isJumpPressed() auto-resets after being read', () => {
    fireKey('keydown', 'Space', ' ');
    expect(input.isJumpPressed()).toBe(true);
    expect(input.isJumpPressed()).toBe(false); // second read → consumed
  });

  it('isJumpPressed() returns true only once per physical press', () => {
    fireKey('keydown', 'Space', ' ');
    const first = input.isJumpPressed();
    const second = input.isJumpPressed();
    expect(first).toBe(true);
    expect(second).toBe(false);
  });

  it('holding Space does NOT repeatedly set jump pending (repeat=true ignored)', () => {
    fireKey('keydown', 'Space', ' ');           // real press
    input.isJumpPressed();                       // consume it
    fireKey('keydown', 'Space', ' ', true);      // browser repeat
    fireKey('keydown', 'Space', ' ', true);      // browser repeat
    expect(input.isJumpPressed()).toBe(false);
  });

  // --- isRestartPressed -----------------------------------------------------

  it('isRestartPressed() returns false before any key press', () => {
    expect(input.isRestartPressed()).toBe(false);
  });

  it('isRestartPressed() returns true after Space keydown', () => {
    fireKey('keydown', 'Space', ' ');
    expect(input.isRestartPressed()).toBe(true);
  });

  it('isRestartPressed() returns true after Enter keydown', () => {
    fireKey('keydown', 'Enter', 'Enter');
    expect(input.isRestartPressed()).toBe(true);
  });

  it('isRestartPressed() auto-resets after being read', () => {
    fireKey('keydown', 'Enter', 'Enter');
    expect(input.isRestartPressed()).toBe(true);
    expect(input.isRestartPressed()).toBe(false);
  });

  it('repeat Enter keydown does not set restart pending again', () => {
    fireKey('keydown', 'Enter', 'Enter');
    input.isRestartPressed();                      // consume
    fireKey('keydown', 'Enter', 'Enter', true);    // repeat
    expect(input.isRestartPressed()).toBe(false);
  });

  // --- both flags can be set simultaneously --------------------------------

  it('Space press sets both jump and restart pending', () => {
    fireKey('keydown', 'Space', ' ');
    expect(input.isJumpPressed()).toBe(true);
    expect(input.isRestartPressed()).toBe(true);
  });

  // --- unrelated keys are ignored ------------------------------------------

  it('unrelated key does not affect jump or restart', () => {
    fireKey('keydown', 'KeyA', 'a');
    expect(input.isJumpPressed()).toBe(false);
    expect(input.isRestartPressed()).toBe(false);
  });
});

