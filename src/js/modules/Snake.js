import {Canvas} from './Canvas.js'
import { PURPLE, GREEN } from './variables.js';

class TailPart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = PURPLE;
  }
}

class Snake {
  constructor(canvas, cellsNumbers, startPopup, _gameOverPopup, retryButton, scoreNode, highScoreNode) {
    this.cellsNumbers = cellsNumbers;
    this.canvasNode = canvas;
    this.canvas = new Canvas(this.canvasNode, cellsNumbers);
    this.startPopup = startPopup;
    this._gameOverPopup = _gameOverPopup;
    this.retryButton = retryButton
    this.scoreNode = scoreNode;
    this.highScoreNode = highScoreNode;
    this.playButton = document.querySelector('[data-play-button]');
    this.head;
    this.food;
    this.tail = [];
    this.isDirectionChanded = false;
    this.isGameStarted = false;
    this.score = 0;
    this.highScore;

    this._startGame = this._startGame.bind(this);
    this._pauseButtonHandler = this._pauseButtonHandler.bind(this);
    this._upHandler = this._upHandler.bind(this);
    this._leftHandler = this._leftHandler.bind(this);
    this._downHandler = this._downHandler.bind(this);
    this._rightHandler = this._rightHandler.bind(this);

    this._init();
  }

  _init() {
    this._createHead(10, 10, 0, 1);
    this._createTail();
    this._createFood();
    window.addEventListener('keydown', this._keydownHandler.bind(this));
    this._drawSnake();
    this.canvasNode.addEventListener('click', this._startGame);
    this.retryButton.addEventListener('click', this._startGame);
    this.highScore = localStorage.getItem('snakeHighScore') ? localStorage.getItem('snakeHighScore') : 0;
    this.highScoreNode.innerHTML = this.highScore;

    document.querySelector('[data-mobile-up]').addEventListener('click', this._upHandler);
    document.querySelector('[data-mobile-left]').addEventListener('click', this._leftHandler);
    document.querySelector('[data-mobile-down]').addEventListener('click', this._downHandler);
    document.querySelector('[data-mobile-right]').addEventListener('click', this._rightHandler);
  }

  _createHead(xCoord, yCoord, Vy, Vx) {
    this.head = {
      x: xCoord,
      y: yCoord,
      Vy: Vy,
      Vx: Vx,
      color: PURPLE,
    }
  }

  _createTail() {
    const xCoord = this.head.x;
    const yCoord = this.head.y;

    for(let i = 1; i <= 4; i++) {
      this.tail.push(new TailPart(xCoord - i, yCoord));
    }
  }

  _drawSnake() {
    this.canvas.drawEl(this.head.color, this.head.x, this.head.y);
    this.tail.forEach(item => this.canvas.drawEl(item.color, item.x, item.y));
  }

  _createFood() {
    this.food = {
      x: Math.floor(Math.random() * this.cellsNumbers[0]),
      y: Math.floor(Math.random() * this.cellsNumbers[1]),
    }

    if (this.head.x == this.food.x && this.head.y == this.food.y) this._createFood();
    this.tail.forEach(item => {
      if (item.x == this.food.x && item.y == this.food.y) this._createFood()
    })
  }

  _upHandler() {
    if (this.head.Vy == 1) return;
    this.head.Vy = -1;
    this.head.Vx = 0;
    this.isDirectionChanded = true;
  }

  _downHandler() {
    if (this.head.Vy == -1) return;
    this.head.Vy = 1;
    this.head.Vx = 0;
    this.isDirectionChanded = true;
  }
  
  _leftHandler() {
    if (this.head.Vx == 1) return;
    this.head.Vx = -1;
    this.head.Vy = 0;
    this.isDirectionChanded = true;
  }

  _rightHandler() {
    if (this.head.Vx == -1) return;
    this.head.Vx = 1;
    this.head.Vy = 0;
    this.isDirectionChanded = true;
  }

  _keydownHandler(e) {
    if (this.isDirectionChanded) {
      e.preventDefault();
      return;
    }
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW':
        e.preventDefault();
        this._upHandler();
        break;
      case 'ArrowDown':
      case 'KeyS':
        e.preventDefault();
        this._downHandler();
        break;
      case 'ArrowLeft':
      case 'KeyA':
        e.preventDefault();
        this._leftHandler();
        break;
      case 'ArrowRight':
      case 'KeyD':
        e.preventDefault();
        this._rightHandler();
        break;
      default:
        break;
    }
  }

  _move() {
    let newHeadX = this.head.x + this.head.Vx;
    let newHeadY = this.head.y + this.head.Vy;

    this.tail.forEach(item => {
      if (item.x == newHeadX && item.y == newHeadY) {
        this._gameOver();
        return;
      }
    })

    if (newHeadX > this.cellsNumbers[0] - 1) newHeadX = 0;
    else if (newHeadX < 0) newHeadX = this.cellsNumbers[0] - 1;

    if (newHeadY > this.cellsNumbers[1] - 1) newHeadY = 0
    else if (newHeadY < 0) newHeadY = this.cellsNumbers[1];

    if (newHeadX === this.food.x && newHeadY === this.food.y) {
      this._createFood();
      this.score++;
      this.scoreNode.innerHTML = this.score;

      if (this.score > this.highScore) { 
        this.highScoreNode.innerHTML = this.score;
      }
    } else {
      this.tail.pop();
    }
    
    this.tail.unshift(new TailPart(this.head.x, this.head.y))

    this.head.x = newHeadX;
    this.head.y = newHeadY;
  }

  _changeFrame() {
    if (!this.isGameStarted) return;
    this.isDirectionChanded = false;
    this._move();
    if (!this.isGameStarted) return;
    this.canvas.clear();
    this._drawSnake();
    this.canvas.drawEl(GREEN, this.food.x, this.food.y);
    this.canvas.drawGrid();
    setTimeout(this._changeFrame.bind(this), 100);
  }

  _startGame() {
    this.canvasNode.removeEventListener('click', this._startGame);
    this.playButton.removeEventListener('click', this._startGame);
    this.playButton.addEventListener('click', this._pauseButtonHandler);
    this.playButton.classList.remove('button--start');
    this.playButton.classList.add('button--stop');
    this.playButton.innerHTML = 'Pause';
    this.tail = [];
    this._createHead(10, 10, 0, 1);
    this._createTail();
    this._createFood();
    this.score = 0;
    this.scoreNode.innerHTML = this.score;
    this.startPopup.classList.add('hidden');
    this._gameOverPopup.classList.add('hidden');
    this.isGameStarted = true;
    this._changeFrame();
  }

  _pauseButtonHandler() {
    if (this.isGameStarted) {
      this.isGameStarted = false;
      this.playButton.classList.remove('button--stop');
      this.playButton.classList.add('button--start');
      this.playButton.innerHTML = 'Play';
    } else {
      this.isGameStarted = true;
      this.playButton.classList.remove('button--start');
      this.playButton.classList.add('button--stop');
      this.playButton.innerHTML = 'Pause';
      this._changeFrame();
    }
  }

  _gameOver() {
    this.isGameStarted = false;
    this._gameOverPopup.classList.remove('hidden');
    if (this.score > this.highScore) {
      const highScore = this.score;
      localStorage.setItem('snakeHighScore', highScore);
      this.highScore = this.score;
    }
  }
}

export {Snake}