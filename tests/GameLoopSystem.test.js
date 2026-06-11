import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GameLoopSystem } from '../src/systems/GameLoopSystem.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal stateManager stub. */
function makeStateManager(state = 'running') {
  return { _state: state, getState() { return this._state; } };
}

/**
 * Simulate one rAF tick by invoking the pending callback with the given
 * timestamp.  Returns the callback that was scheduled for the *next* frame
 * so tests can chain ticks manually when needed.
 */
function tick(timestamp) {
  const cb = requestAnimationFrame.mock.calls.at(-1)?.[0];
  if (!cb) throw new Error('No pending rAF callback found');
  cb(timestamp);
}

// ---------------------------------------------------------------------------
// Setup / teardown
// ---------------------------------------------------------------------------

beforeEach(() => {
  let handle = 0;
  global.requestAnimationFrame = vi.fn((cb) => { handle += 1; cb._handle = handle; return handle; });
  global.cancelAnimationFrame = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('GameLoopSystem', () => {
  // --- instantiation --------------------------------------------------------

  it('creates with zero elapsed time and frame count', () => {
    const loop = new GameLoopSystem();
    expect(loop.getElapsedTime()).toBe(0);
    expect(loop.getFrameCount()).toBe(0);
  });

  // --- start / stop ---------------------------------------------------------

  it('start() schedules a requestAnimationFrame', () => {
    const loop = new GameLoopSystem();
    loop.start();
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    loop.stop();
  });

  it('calling start() twice does not create duplicate loops', () => {
    const loop = new GameLoopSystem();
    loop.start();
    loop.start(); // second call must be a no-op
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    loop.stop();
  });

  it('stop() cancels the animation frame', () => {
    const loop = new GameLoopSystem();
    loop.start();
    loop.stop();
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
  });

  it('stop() prevents further ticking', () => {
    const update = vi.fn();
    const loop = new GameLoopSystem();
    loop.onUpdate(update);
    loop.start();
    loop.stop();
    // The rAF callback was already queued but _running is false → should bail.
    tick(16);
    expect(update).not.toHaveBeenCalled();
  });

  // --- reset ----------------------------------------------------------------

  it('reset() stops the loop and clears timing state', () => {
    const loop = new GameLoopSystem();
    loop.start();
    tick(0);   // first frame – sets _lastTimestamp
    tick(100); // second frame – accumulates elapsed time
    loop.reset();
    expect(loop.getElapsedTime()).toBe(0);
    expect(loop.getFrameCount()).toBe(0);
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  // --- delta time -----------------------------------------------------------

  it('delta time on first frame is 0', () => {
    const update = vi.fn();
    const loop = new GameLoopSystem();
    loop.onUpdate(update);
    loop.start();
    tick(0); // first tick – _lastTimestamp was null → dt should be 0
    expect(update).toHaveBeenCalledWith(0);
    loop.stop();
  });

  it('delta time is calculated in seconds', () => {
    const update = vi.fn();
    const loop = new GameLoopSystem();
    loop.onUpdate(update);
    loop.start();
    tick(0);   // first frame
    tick(16);  // ~16 ms later
    expect(update).toHaveBeenLastCalledWith(0.016);
    loop.stop();
  });

  it('delta time is capped at 0.05 s', () => {
    const update = vi.fn();
    const loop = new GameLoopSystem();
    loop.onUpdate(update);
    loop.start();
    tick(0);
    tick(500); // huge gap – simulates tab being hidden
    expect(update).toHaveBeenLastCalledWith(0.05);
    loop.stop();
  });

  // --- elapsed time & frame count -------------------------------------------

  it('elapsed time accumulates across frames', () => {
    const loop = new GameLoopSystem();
    loop.start();
    tick(0);
    tick(20);  // dt = 0.02
    tick(40);  // dt = 0.02
    // total elapsed ≈ 0.04 (first frame contributes 0)
    expect(loop.getElapsedTime()).toBeCloseTo(0.04);
    loop.stop();
  });

  it('frame count increments every tick regardless of state', () => {
    const sm = makeStateManager('menu');
    const loop = new GameLoopSystem(sm);
    loop.start();
    tick(0);
    tick(16);
    tick(32);
    expect(loop.getFrameCount()).toBe(3);
    loop.stop();
  });

  // --- state machine integration --------------------------------------------

  it('skips update callbacks when state is "menu"', () => {
    const update = vi.fn();
    const sm = makeStateManager('menu');
    const loop = new GameLoopSystem(sm);
    loop.onUpdate(update);
    loop.start();
    tick(0);
    tick(16);
    expect(update).not.toHaveBeenCalled();
    loop.stop();
  });

  it('skips update callbacks when state is "gameOver"', () => {
    const update = vi.fn();
    const sm = makeStateManager('gameOver');
    const loop = new GameLoopSystem(sm);
    loop.onUpdate(update);
    loop.start();
    tick(0);
    tick(16);
    expect(update).not.toHaveBeenCalled();
    loop.stop();
  });

  it('runs update callbacks when state is "running"', () => {
    const update = vi.fn();
    const sm = makeStateManager('running');
    const loop = new GameLoopSystem(sm);
    loop.onUpdate(update);
    loop.start();
    tick(0);
    tick(16);
    expect(update).toHaveBeenCalled();
    loop.stop();
  });

  it('render callbacks always run regardless of state', () => {
    const render = vi.fn();
    const sm = makeStateManager('menu');
    const loop = new GameLoopSystem(sm);
    loop.onRender(render);
    loop.start();
    tick(0);
    tick(16);
    expect(render).toHaveBeenCalledTimes(2);
    loop.stop();
  });

  // --- callback ordering ----------------------------------------------------

  it('calls update before render each frame', () => {
    const order = [];
    const loop = new GameLoopSystem();
    loop.onUpdate(() => order.push('update'));
    loop.onRender(() => order.push('render'));
    loop.start();
    tick(0);
    expect(order).toEqual(['update', 'render']);
    loop.stop();
  });

  // --- elapsed time skipped when state paused --------------------------------

  it('elapsed time does not accumulate when state is "menu"', () => {
    const sm = makeStateManager('menu');
    const loop = new GameLoopSystem(sm);
    loop.start();
    tick(0);
    tick(100);
    expect(loop.getElapsedTime()).toBe(0);
    loop.stop();
  });
});
