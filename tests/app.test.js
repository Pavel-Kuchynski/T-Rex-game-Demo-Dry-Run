import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../src/core/constants.js';

describe('project setup', () => {
  it('exports the expected canvas dimensions', () => {
    expect(CANVAS_WIDTH).toBe(800);
    expect(CANVAS_HEIGHT).toBe(300);
  });

  it('can initialize the game canvas element', () => {
    document.body.innerHTML = '<canvas id="game-canvas"></canvas>';

    const canvas = document.getElementById('game-canvas');

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    expect(canvas.width).toBe(800);
    expect(canvas.height).toBe(300);
  });
});

