import {Canvas} from './Canvas.js'

class TailPart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = PURPLE;
  }
}

class Snake {
  constructor(canvas, cellsNumbers, startPopup, gameOverPopup, retryButton, scoreNode, highScoreNode) {
    this.cellsNumbers = cellsNumbers;
    this.canvasNode = canvas;
    this.canvas = new Canvas(this.canvasNode, cellsNumbers);
    this.startPopup = startPopup;
    this.gameOverPopup = gameOverPopup;
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

    this.startGame = this.startGame.bind(this);
    this.pauseButtonHandler = this.pauseButtonHandler.bind(this);

    this.init();
  }

  init() {
    this.createHead(10, 10, 0, 1);
    this.createTail();
    this.createFood();
    window.addEventListener('keydown', this.keydownHandler.bind(this));
    this.drawSnake();
    this.canvasNode.addEventListener('click', this.startGame);
    this.retryButton.addEventListener('click', this.startGame);
    this.highScore = localStorage.getItem('snakeHighScore') ? localStorage.getItem('snakeHighScore') : 0;
    this.highScoreNode.innerHTML = this.highScore;
  }

  createHead(xCoord, yCoord, Vy, Vx) {
    this.head = {
      x: xCoord,
      y: yCoord,
      Vy: Vy,
      Vx: Vx,
      color: PURPLE,
    }
  }

  createTail() {
    const xCoord = this.head.x;
    const yCoord = this.head.y;

    for(let i = 1; i <= 4; i++) {
      this.tail.push(new TailPart(xCoord - i, yCoord));
    }
  }

  drawSnake() {
    this.canvas.drawEl(this.head.color, this.head.x, this.head.y);
    this.tail.forEach(item => this.canvas.drawEl(item.color, item.x, item.y));
  }

  createFood() {
    this.food = {
      x: Math.floor(Math.random() * this.cellsNumbers[0]),
      y: Math.floor(Math.random() * this.cellsNumbers[1]),
    }

    if (this.head.x == this.food.x && this.head.y == this.food.y) this.createFood();
    this.tail.forEach(item => {
      if (item.x == this.food.x && item.y == this.food.y) this.createFood()
    })
  }

  keydownHandler(e) {
    if (this.isDirectionChanded) {
      e.preventDefault();
      return;
    }
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW':
        e.preventDefault();
        if (this.head.Vy == 1) return;
        this.head.Vy = -1;
        this.head.Vx = 0;
        this.isDirectionChanded = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        e.preventDefault();
        if (this.head.Vy == -1) return;
        this.head.Vy = 1;
        this.head.Vx = 0;
        this.isDirectionChanded = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        e.preventDefault();
        if (this.head.Vx == 1) return;
        this.head.Vx = -1;
        this.head.Vy = 0;
        this.isDirectionChanded = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        e.preventDefault();
        if (this.head.Vx == -1) return;
        this.head.Vx = 1;
        this.head.Vy = 0;
        this.isDirectionChanded = true;
        break;
      default:
        break;

    }
  }

  move() {
    let newHeadX = this.head.x + this.head.Vx;
    let newHeadY = this.head.y + this.head.Vy;

    this.tail.forEach(item => {
      if (item.x == newHeadX && item.y == newHeadY) {
        this.gameOver();
        return;
      }
    })

    if (newHeadX > this.cellsNumbers[0] - 1) newHeadX = 0;
    else if (newHeadX < 0) newHeadX = this.cellsNumbers[0] - 1;

    if (newHeadY > this.cellsNumbers[1] - 1) newHeadY = 0
    else if (newHeadY < 0) newHeadY = this.cellsNumbers[1];

    if (newHeadX === this.food.x && newHeadY === this.food.y) {
      this.createFood();
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

  changeFrame() {
    if (!this.isGameStarted) return;
    this.isDirectionChanded = false;
    this.move();
    if (!this.isGameStarted) return;
    this.canvas.clear();
    this.drawSnake();
    this.canvas.drawEl(GREEN, this.food.x, this.food.y);
    this.canvas.drawGrid();
    setTimeout(this.changeFrame.bind(this), 100);
  }

  startGame() {
    this.canvasNode.removeEventListener('click', this.startGame);
    this.playButton.removeEventListener('click', this.startGame);
    this.playButton.addEventListener('click', this.pauseButtonHandler);
    this.playButton.classList.remove('button--start');
    this.playButton.classList.add('button--stop');
    this.playButton.innerHTML = 'Pause';
    this.tail = [];
    this.createHead(10, 10, 0, 1);
    this.createTail();
    this.createFood();
    this.score = 0;
    this.scoreNode.innerHTML = this.score;
    this.startPopup.classList.add('hidden');
    this.gameOverPopup.classList.add('hidden');
    this.isGameStarted = true;
    this.changeFrame();
  }

  pauseButtonHandler() {
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
      this.changeFrame();
    }
  }

  // pauseGame() {
  //   this.isGameStarted = false;
  //   this.playButton.removeEventListener('click', this.pauseButtonHandler);
  //   this.playButton.addEventListener('click', this.continueGame);
  //   this.playButton.classList.remove('button--stop');
  //   this.playButton.classList.add('button--start');
  //   this.playButton.innerHTML = 'Play';
  // }

  // continueGame() {
  //   this.isGameStarted = true;
  //   this.changeFrame();
  //   this.playButton.classList.remove('button--start');
  //   this.playButton.classList.add('button--stop');
  //   this.playButton.innerHTML = 'Pause';
  //   this.playButton.addEventListener('click', this.pauseButtonHandler);
  //   this.playButton.removeEventListener('click', this.continueGame);
  // }

  gameOver() {
    this.isGameStarted = false;
    this.gameOverPopup.classList.remove('hidden');
    if (this.score > this.highScore) {
      const highScore = this.score;
      localStorage.setItem('snakeHighScore', highScore);
      this.highScore = this.score;
    }
  }
}

export {Snake}