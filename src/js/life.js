import {Life} from './modules/Life.js'

const canvas = document.querySelector('[data-canvas]');
const counter = document.querySelector('[data-count]');
const startButton = document.querySelector('[data-start]');
const resetButton = document.querySelector('[data-reset]')
let cellsNumber;

if (window.innerWidth < 1024) {
  cellsNumber = [20, 20]
} else {
  cellsNumber = [30, 30]
}

const life = new Life(canvas, counter, startButton, resetButton, cellsNumber);