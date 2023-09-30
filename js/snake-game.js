import {Snake} from './modules/Snake.js'

const canvas = document.querySelector('[data-canvas]');
const cellsNumber = [36, 36];
const startButton = document.querySelector('[data-start]');
const gameOverPopup = document.querySelector('[data-game-over]');
const retryButton = gameOverPopup.querySelector('[data-retry]');
const score = document.querySelector('[data-score]');
const highScore = document.querySelector('[data-high-score]');

const snake = new Snake(canvas, cellsNumber, startButton, gameOverPopup, retryButton, score, highScore)