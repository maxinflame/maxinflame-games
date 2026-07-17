import { CELLS_NUMBER, HEAD_COORD, HEAD_SPEED } from './snake-variables';

class TailPart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class SnakeGame {
  constructor(onGameOver = () => {}, onFoodEaten = () => {}) {
    this._onGameOver = onGameOver;
    this._onFoodEaten = onFoodEaten;

    this._init();
  }

  _init() {
    this._createHead(...HEAD_COORD, ...HEAD_SPEED);
    this._createTail();
    this._createFood();
  }

  _createHead(xCoord, yCoord, Vy, Vx) {
    this._head = {
      x: xCoord,
      y: yCoord,
      Vy: Vy,
      Vx: Vx,
    };
  }

  _createTail() {
    this._tail = [];

    const xCoord = this._head.x;
    const yCoord = this._head.y;

    for (let i = 1; i <= 4; i++) {
      this._tail.push(new TailPart(xCoord - i, yCoord));
    }
  }

  _createFood() {
    this._food = {
      x: Math.floor(Math.random() * CELLS_NUMBER[0]),
      y: Math.floor(Math.random() * CELLS_NUMBER[1]),
    };

    if (this._head.x == this._food.x && this._head.y == this._food.y) this._createFood();

    this._tail.forEach((item) => {
      if (item.x == this._food.x && item.y == this._food.y) this._createFood();
    });
  }

  move() {
    let newHeadX = this._head.x + this._head.Vx;
    let newHeadY = this._head.y + this._head.Vy;

    this._tail.forEach((item) => {
      if (item.x == newHeadX && item.y == newHeadY) {
        this._onGameOver();
        return;
      }
    });

    if (newHeadX > CELLS_NUMBER[0] - 1) newHeadX = 0;
    else if (newHeadX < 0) newHeadX = CELLS_NUMBER[0] - 1;

    if (newHeadY > CELLS_NUMBER[1] - 1) newHeadY = 0;
    else if (newHeadY < 0) newHeadY = CELLS_NUMBER[1];

    if (newHeadX === this._food.x && newHeadY === this._food.y) {
      this._onFoodEaten();
      this._createFood();
    } else {
      this._tail.pop();
    }

    this._tail.unshift(new TailPart(this._head.x, this._head.y));

    this._head.x = newHeadX;
    this._head.y = newHeadY;
  }

  reset() {
    this._createHead(...HEAD_COORD, ...HEAD_SPEED);
    this._createTail();
    this._createFood();
  }

  getHead() {
    return { ...this._head };
  }

  getTail() {
    return [...this._tail];
  }

  getFood() {
    return this._food;
  }

  setDirection(direction) {
    switch (direction) {
      case 'up':
        if (this._head.Vy == 1) return;
        this._head.Vy = -1;
        this._head.Vx = 0;
        break;
      case 'down':
        if (this._head.Vy == -1) return;
        this._head.Vy = 1;
        this._head.Vx = 0;
        break;
      case 'left':
        if (this._head.Vx == 1) return;
        this._head.Vx = -1;
        this._head.Vy = 0;
        break;
      case 'right':
        if (this._head.Vx == -1) return;
        this._head.Vx = 1;
        this._head.Vy = 0;
        break;
    }
  }
}

export { SnakeGame };
