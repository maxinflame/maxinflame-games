import { Canvas } from '../Canvas.js';
import { SubmitScoreForm } from '../SubmitScoreForm.js';
import { PURPLE, GREEN } from '../variables.js';
import { CELLS_NUMBER } from './snake-variables.js';
import { SnakeGame } from './SnakeGame.js';

class SnakeUI {
  constructor(canvas, startPopup, _gameOverPopup, retryButton, scoreNode, highScoreNode) {
    this.canvasNode = canvas;
    this.canvas = new Canvas(this.canvasNode, CELLS_NUMBER);
    this.startPopup = startPopup;
    this._gameOverPopup = _gameOverPopup;
    this.retryButton = retryButton;
    this.scoreNode = scoreNode;
    this.highScoreNode = highScoreNode;
    this.playButton = document.querySelector('[data-play-button]');
    this.isDirectionChanded = false;
    this.isGameStarted = false;
    this.score = 0;
    this.highScore;
    this._submitScoreForm = new SubmitScoreForm(document.querySelector('[data-submit-score-form]'));

    this._startGame = this._startGame.bind(this);
    this._pauseButtonHandler = this._pauseButtonHandler.bind(this);

    this._gameOver = this._gameOver.bind(this);
    this._foodEaten = this._foodEaten.bind(this);

    this._init();
  }

  _init() {
    window.addEventListener('keydown', this._keydownHandler.bind(this));

    this._snakeGame = new SnakeGame(this._gameOver, this._foodEaten);

    this._drawSnake();

    this.canvasNode.addEventListener('click', this._startGame);
    this.retryButton.addEventListener('click', this._startGame);
    this.playButton.addEventListener('click', this._startGame);
    this.highScore = localStorage.getItem('snakeHighScore')
      ? localStorage.getItem('snakeHighScore')
      : 0;
    this.highScoreNode.innerHTML = this.highScore;
    document.querySelector('[data-mobile-up]').addEventListener('click', this._upHandler);
    document.querySelector('[data-mobile-left]').addEventListener('click', this._leftHandler);
    document.querySelector('[data-mobile-down]').addEventListener('click', this._downHandler);
    document.querySelector('[data-mobile-right]').addEventListener('click', this._rightHandler);
  }

  _drawSnake() {
    const head = this._snakeGame.getHead();
    const tail = this._snakeGame.getTail();

    this.canvas.drawEl(PURPLE, head.x, head.y);
    tail.forEach((item) => this.canvas.drawEl(PURPLE, item.x, item.y));
  }

  _drawFood() {
    const food = this._snakeGame.getFood();

    this.canvas.drawEl(GREEN, food.x, food.y);
  }

  _keydownHandler(e) {
    if (!this.isGameStarted) return true;

    if (this.isDirectionChanded) {
      e.preventDefault();
      return;
    }

    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW':
        e.preventDefault();
        this._snakeGame.setDirection('up');
        this._upHandler();
        break;
      case 'ArrowDown':
      case 'KeyS':
        e.preventDefault();
        this._snakeGame.setDirection('down');
        break;
      case 'ArrowLeft':
      case 'KeyA':
        e.preventDefault();
        this._snakeGame.setDirection('left');
        break;
      case 'ArrowRight':
      case 'KeyD':
        e.preventDefault();
        this._snakeGame.setDirection('right');
        break;
    }

    this.isDirectionChanded = true;
  }

  _changeFrame() {
    if (!this.isGameStarted) return;
    this.isDirectionChanded = false;
    this._snakeGame.move();

    if (!this.isGameStarted) return;
    this.canvas.clear();
    this._drawSnake();
    this._drawFood();

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

    this._snakeGame.reset();

    this.score = 0;
    this.scoreNode.innerHTML = this.score;
    this.startPopup.classList.add('hidden');
    this._gameOverPopup.classList.add('hidden');
    this._gameOverPopup.classList.remove('error');
    this._gameOverPopup.classList.remove('success');
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
    const score = this.score;

    this.isGameStarted = false;
    this._submitScoreForm.updateScore(score);
    this._gameOverPopup.classList.remove('hidden');

    if (score > this.highScore) {
      localStorage.setItem('snakeHighScore', score);
      this.highScore = score;
    }
  }

  _foodEaten() {
    this.score++;
    this.scoreNode.innerHTML = this.score;

    if (this.score > this.highScore) {
      this.highScoreNode.innerHTML = this.score;
    }
  }
}

export { SnakeUI };
