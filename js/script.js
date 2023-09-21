import {Life} from './modules/Life.js'

const canvas = document.querySelector('[data-canvas]');
const counter = document.querySelector('[data-count]');
const startButton = document.querySelector('[data-start]');

const life = new Life(canvas, counter, startButton);
life.init();