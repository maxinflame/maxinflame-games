import { TetraminoFactory } from './TetraminoFactory';
import { FIELD_SIZE } from './tetrisVariables';

class TetrisGame {
  constructor() {
    this._field = [];
    this._piece = null;
    this._listeners = {};

    this._changeFrame = this._changeFrame.bind(this);

    this._init();
  }

  _init() {
    this._tetraminoFactory = new TetraminoFactory();
    this._createField();
  }

  _createField() {
    this._field = Array.from({ length: FIELD_SIZE.y }, () => Array(FIELD_SIZE.x).fill(0));
  }

  startGame() {
    this._createNewPiece();
    this._changeFrame();
  }

  _createNewPiece() {
    this._piece = {};
    this._piece.shape = this._tetraminoFactory.getRandomPiece();
    this._piece.x = Math.floor((FIELD_SIZE.x - this._piece.shape.length) / 2);
    this._piece.y = -3;
  }

  async _changeFrame() {
    if (this._canPlace(this._piece.shape, this._piece.x, this._piece.y + 1)) {
      this.move('down', false);
    } else {
      if (this._isItGameOver()) {
        this._emit('gameOver');
        return;
      }

      this._addPieceToField();
      this._piece = null;

      const filledRows = this._getFilledRows();

      if (filledRows.length > 0) {
        await this._emptyFilledRows(filledRows);
        this._emit('changeFrame');
        await this._removeFilledRows(filledRows);
        this._emit('changeFrame');
      }

      this._createNewPiece();
    }

    this._emit('changeFrame');

    setTimeout(this._changeFrame, 300);
  }

  _getFilledRows() {
    return this._field.reduce((a, row, y) => {
      if (!row.includes(0)) a.push(y);
      return a;
    }, []);
  }

  async _emptyFilledRows(rows) {
    rows.forEach((row) => {
      this._field[row] = Array(FIELD_SIZE.x).fill(0);
    });

    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  async _removeFilledRows(filledRows) {
    this._field = this._field.filter((_, index) => {
      return !filledRows.includes(index);
    });

    while (this._field.length < FIELD_SIZE.y) {
      this._field.unshift(Array(FIELD_SIZE.x).fill(0));
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  move(direction, emit = false) {
    switch (direction) {
      case 'down':
        this._piece.y += 1;
        break;
      case 'right':
        if (this._canPlace(this._piece.shape, this._piece.x + 1, this._piece.y)) this._piece.x += 1;
        break;
      case 'left':
        if (this._canPlace(this._piece.shape, this._piece.x - 1, this._piece.y)) this._piece.x -= 1;
        break;
      default:
        console.log(direction);
    }

    if (emit) this._emit('changeFrame');
  }

  rotate() {
    const rotated = this._tetraminoFactory.rotateShape(this._piece.shape);

    const kicks = [
      [0, 0], // оставить как есть
      [-1, 0], // сдвиг влево
      [1, 0], // вправо
      [-2, 0],
      [2, 0],
      [0, -1], // вверх
    ];

    for (const [dx, dy] of kicks) {
      const newX = this._piece.x + dx;
      const newY = this._piece.y + dy;

      if (this._canPlace(rotated, newX, newY)) {
        this._piece.shape = rotated;
        this._piece.x = newX;
        this._piece.y = newY;

        this._emit('changeFrame');
        return;
      }
    }
  }

  _canPlace(shape, x, y) {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (!shape[row][col]) continue;

        const fieldX = x + col;
        const fieldY = y + row;

        if (fieldX < 0 || fieldX >= FIELD_SIZE.x) {
          return false;
        }

        if (fieldY >= FIELD_SIZE.y) {
          return false;
        }

        if (fieldY >= 0 && this._field[fieldY][fieldX]) {
          return false;
        }
      }
    }

    return true;
  }

  _addPieceToField() {
    const shape = this._piece.shape;
    for (let y = 0; y < shape.length; y++) {
      const fieldY = this._piece.y + y;

      for (let x = 0; x < shape[y].length; x++) {
        if (!shape[y][x]) continue;

        const fieldX = this._piece.x + x;
        this._field[fieldY][fieldX] = 1;
      }
    }
  }

  _isItGameOver() {
    return this._piece.y < 1;
  }

  on(event, callback) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  _emit(event, data) {
    this._listeners[event]?.forEach((cb) => cb(data));
  }

  getField() {
    return [...this._field];
  }

  setField(field) {
    this._field = [...field];
  }

  getPiece() {
    return { ...this._piece };
  }
}

export { TetrisGame };
