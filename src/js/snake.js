import { SnakeUI } from './modules/snake/SnakeUI.js';
import { FullscreenButton } from './modules/FullscreenButton.js';

const canvas = document.querySelector('[data-canvas]');

const startButton = document.querySelector('[data-start]');
const gameOverPopup = document.querySelector('[data-game-over]');
const retryButton = gameOverPopup.querySelector('[data-retry]');
const score = document.querySelector('[data-score]');
const highScore = document.querySelector('[data-high-score]');

new SnakeUI(canvas, startButton, gameOverPopup, retryButton, score, highScore);
new FullscreenButton();
