import { CANVAS_HEIGHT, CANVAS_WIDTH } from './core/constants.js';

const canvas = document.getElementById('game-canvas');

if (!canvas) {
  throw new Error('Missing required canvas element with id "game-canvas".');
}

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const context = canvas.getContext('2d');

if (!context) {
  throw new Error('Failed to get 2D rendering context.');
}

context.clearRect(0, 0, canvas.width, canvas.height);
context.fillStyle = '#222';
context.font = '20px Arial';
context.fillText('T-Rex Runner setup complete', 20, 40);

