/**
 * GameLoopSystem
 *
 * Drives the main update → render cycle using requestAnimationFrame.
 * - Calculates delta time in seconds.
 * - Caps delta time at MAX_DELTA to prevent spiral-of-death on tab blur/resume.
 * - Skips physics update callbacks when the state machine is in 'menu' or 'gameOver'.
 * - Render callbacks always run (so the UI stays responsive).
 */

const MAX_DELTA = 0.05; // 50 ms cap
const SKIP_UPDATE_STATES = new Set(['menu', 'gameOver']);

export class GameLoopSystem {
  /** @param {{ getState: () => string } | null} stateManager */
  constructor(stateManager = null) {
    this._stateManager = stateManager;

    /** @type {Array<(dt: number) => void>} */
    this._updateCallbacks = [];

    /** @type {Array<() => void>} */
    this._renderCallbacks = [];

    this._rafHandle = null;
    this._lastTimestamp = null;
    this._elapsedTime = 0;
    this._frameCount = 0;
    this._running = false;

    // Bind once so the same reference is reused every frame (no per-frame allocation).
    this._loop = this._loop.bind(this);
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  /**
   * Register a callback to be called every physics tick with (deltaTime).
   * Skipped when the game state is 'menu' or 'gameOver'.
   * @param {(dt: number) => void} fn
   */
  onUpdate(fn) {
    this._updateCallbacks.push(fn);
  }

  /**
   * Register a callback to be called every frame for rendering.
   * Always called regardless of game state.
   * @param {() => void} fn
   */
  onRender(fn) {
    this._renderCallbacks.push(fn);
  }

  /**
   * Start the requestAnimationFrame loop.
   * Calling start() while already running is a no-op.
   */
  start() {
    if (this._running) return;
    this._running = true;
    this._lastTimestamp = null; // reset timing so first frame gets dt = 0
    this._rafHandle = requestAnimationFrame(this._loop);
  }

  /**
   * Stop the loop and cancel the pending animation frame.
   */
  stop() {
    this._running = false;
    if (this._rafHandle !== null) {
      cancelAnimationFrame(this._rafHandle);
      this._rafHandle = null;
    }
  }

  /**
   * Stop the loop and reset all accumulated timing state.
   */
  reset() {
    this.stop();
    this._lastTimestamp = null;
    this._elapsedTime = 0;
    this._frameCount = 0;
  }

  /** @returns {number} Total elapsed game time in seconds (excluding paused frames). */
  getElapsedTime() {
    return this._elapsedTime;
  }

  /** @returns {number} Total number of rendered frames since last reset. */
  getFrameCount() {
    return this._frameCount;
  }

  // ---------------------------------------------------------------------------
  // Private
  // ---------------------------------------------------------------------------

  /**
   * Core rAF callback.
   * @param {DOMHighResTimeStamp} timestamp
   */
  _loop(timestamp) {
    if (!this._running) return;

    // Calculate delta time (seconds).
    let deltaTime = 0;
    if (this._lastTimestamp !== null) {
      deltaTime = (timestamp - this._lastTimestamp) / 1000;
      // Cap to prevent spiral-of-death when the tab was hidden / throttled.
      if (deltaTime > MAX_DELTA) deltaTime = MAX_DELTA;
    }
    this._lastTimestamp = timestamp;

    this._frameCount += 1;

    // Determine whether physics updates should run.
    const state = this._stateManager ? this._stateManager.getState() : 'running';
    const shouldUpdate = !SKIP_UPDATE_STATES.has(state);

    if (shouldUpdate) {
      this._elapsedTime += deltaTime;
      for (let i = 0; i < this._updateCallbacks.length; i++) {
        this._updateCallbacks[i](deltaTime);
      }
    }

    // Render callbacks always execute.
    for (let i = 0; i < this._renderCallbacks.length; i++) {
      this._renderCallbacks[i]();
    }

    // Schedule next frame.
    this._rafHandle = requestAnimationFrame(this._loop);
  }
}

