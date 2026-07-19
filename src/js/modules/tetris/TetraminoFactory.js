const TETROMINOS = [
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
];

class TetraminoFactory {
  constructor() {}

  getRandomPiece() {
    return TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
  }

  rotateShape(shape) {
    const size = shape.length;

    const rotated = Array.from({ length: size }, () => Array(size).fill(0));

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (!shape[y][x]) continue;

        rotated[x][size - y - 1] = 1;
      }
    }

    return rotated;
  }
}

export { TetraminoFactory };
