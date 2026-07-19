import { Canvas } from '../Canvas';
import { PURPLE } from '../variables';
import { TetrisGame } from './TetrisGame';
import { FIELD_SIZE } from './tetrisVariables';

class TetrisUI {
  constructor(canvas) {
    this._canvas = new Canvas(canvas, [FIELD_SIZE.x, FIELD_SIZE.y]);

    this._changeFrameHandler = this._changeFrameHandler.bind(this);

    this._init();
  }

  _init() {
    this._tetrisGame = new TetrisGame();

    this._tetrisGame.on('changeFrame', this._changeFrameHandler);
    this._tetrisGame.on('gameOver', () => console.log('Game Over'));

    window.addEventListener('keydown', this._keydownHandler.bind(this));

    this._startGame();
  }

  _startGame() {
    this._tetrisGame.startGame();
  }

  _changeFrameHandler() {
    this._canvas.clear();
    this._drawPiece();
    this._drawField();
    this._canvas.drawGrid();
  }

  _drawPiece() {
    const piece = this._tetrisGame.getPiece();

    if (!piece.shape) return;

    const shape = piece.shape;

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        shape[y][x];
        if (!shape[y][x]) continue;

        this._canvas.drawEl(PURPLE, piece.x + x, piece.y + y);
      }
    }
  }

  _drawField() {
    const field = this._tetrisGame.getField();

    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[y].length; x++) {
        if (!field[y][x]) continue;

        this._canvas.drawEl(PURPLE, x, y);
      }
    }
  }

  _keydownHandler(e) {
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW':
        e.preventDefault();
        this._tetrisGame.rotate();
        break;
      case 'ArrowDown':
      case 'KeyS':
        e.preventDefault();
        break;
      case 'ArrowLeft':
      case 'KeyA':
        e.preventDefault();
        this._tetrisGame.move('left', true);
        break;
      case 'ArrowRight':
      case 'KeyD':
        e.preventDefault();
        this._tetrisGame.move('right', true);
        break;
    }
  }
}

export { TetrisUI };
