import { describe, it, expect, vi } from 'vitest';
import { SnakeGame } from '../src/js/modules/snake/SnakeGame';
import { CELLS_NUMBER, HEAD_COORD, HEAD_SPEED } from '../src/js/modules/snake/snake-variables';

describe('SnakeGame', () => {
  it('initializes snake correctly', () => {
    const game = new SnakeGame();

    expect(game.getHead()).toEqual({
      x: HEAD_COORD[0],
      y: HEAD_COORD[1],
      Vy: HEAD_SPEED[0],
      Vx: HEAD_SPEED[1],
    });

    expect(game.getTail()).toHaveLength(4);
  });

  it('moves snake right', () => {
    const game = new SnakeGame();

    game.move();

    expect(game.getHead().x).toBe(11);
  });

  it('changes direction to up', () => {
    const game = new SnakeGame();

    game.setDirection('up');

    expect(game.getHead()).toMatchObject({
      Vy: -1,
      Vx: 0,
    });
  });

  it('cannot turn 180 degrees', () => {
    const game = new SnakeGame();

    game.setDirection('left');

    expect(game.getHead().Vx).toBe(1);
  });

  it('wraps horizontally', () => {
    const game = new SnakeGame();

    game._head.x = CELLS_NUMBER[0] - 1;

    game.move();

    expect(game.getHead().x).toBe(0);
  });

  it('calls food eaten callback', () => {
    const onFoodEaten = vi.fn();

    const game = new SnakeGame(null, onFoodEaten);

    game._food = {
      x: 11,
      y: 10,
    };

    game.move();

    expect(onFoodEaten).toHaveBeenCalled();
  });

  it('grows after eating food', () => {
    const game = new SnakeGame();

    game._food = {
      x: 11,
      y: 10,
    };

    const oldLength = game.getTail().length;

    game.move();

    expect(game.getTail().length).toBe(oldLength + 1);
  });

  it('calls game over when snake hits its tail', () => {
    const onGameOver = vi.fn();

    const game = new SnakeGame(onGameOver);

    // Еда прямо перед головой
    game._food = {
      x: 11,
      y: 10,
    };

    // Съедаем еду -> хвост увеличивается
    game.move();

    // Сейчас:
    // голова: 11,10
    // хвост содержит предыдущую позицию головы: 10,10

    game.setDirection('down');
    game.move();

    game.setDirection('left');
    game.move();

    game.setDirection('up');
    game.move();

    expect(onGameOver).toHaveBeenCalled();
  });
});
