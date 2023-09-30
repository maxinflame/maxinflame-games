class Canvas {  
  constructor(node, cellsNumber) {
    this.node = node;
    this.ctx = this.node.getContext('2d');
    this._cellsNumber = cellsNumber;
    this.cellSize;
    this.setSize();
    this.drawGrid();
  }

  get cellsNumber() {
    return this._cellsNumber;
  }

  set cellsNumber(value) {
    this._cellsNumber = value;
  }

  setSize() {
    this.node.width = this.node.offsetWidth;
    this.node.height = this.node.offsetWidth * (this.cellsNumber[1] / this.cellsNumber[0]);
    this.cellSize = this.node.offsetWidth / this.cellsNumber[0];
  }

  drawField(arr) {
    this.ctx.clearRect(0, 0, this.node.offsetWidth, this.node.offsetHeight);
    this.ctx.fillStyle = PURPLE;
    for (let i = 0; i < this.cellsNumber[0]; i++) {
      for(let j = 0; j < this.cellsNumber[1]; j++) {
        if (arr[i][j] === 1) {
          this.ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }
    this.drawGrid();
  }

  drawEl(color, x, y) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
  }

  drawGrid() {
    this.ctx.beginPath();
    
    let xCoord = 0;
    let yCoord = 0;

    while (xCoord <= this.node.offsetWidth) {
      xCoord += this.cellSize;
      this.ctx.moveTo(xCoord, 0);
      this.ctx.lineTo(xCoord, this.node.offsetHeight);
    }

    while (yCoord <= this.node.offsetHeight) {
      yCoord += this.cellSize;
      this.ctx.moveTo(0, yCoord);
      this.ctx.lineTo(this.node.offsetWidth, yCoord);
    }

    this.ctx.strokeStyle = LIGHT_LINES_COLOR;
    this.ctx.stroke();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.node.offsetWidth, this.node.offsetHeight);
  }
}

export {Canvas}