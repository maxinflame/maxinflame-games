class Canvas {  
  constructor(node) {
    this.node = node;
    this.ctx = this.node.getContext('2d');

    this.node.width = this.node.offsetWidth;
    this.node.height = this.node.offsetHeight;

    this.drawGrid();
  }

  drawField(arr) {
    this.ctx.clearRect(0, 0, this.node.offsetWidth, this.node.offsetHeight);
    this.ctx.fillStyle = '#de13de';
    for (let i = 0; i < 30; i++) {
      for(let j = 0; j < 30; j++) {
        if (arr[i][j] === 1) {
          this.ctx.fillRect(j * (this.node.offsetWidth / 30), i * (this.node.offsetWidth / 30), (this.node.offsetWidth / 30), (this.node.offsetWidth / 30));
        }
      }
    }
    this.drawGrid();
  }

  drawGrid() {
    this.ctx.beginPath();
    
    let xCoord = 0;
    let yCoord = 0;

    while (xCoord <= this.node.offsetWidth) {
      xCoord += this.node.offsetWidth / 30;
      this.ctx.moveTo(xCoord, 0);
      this.ctx.lineTo(xCoord, this.node.offsetHeight);
    }

    while (yCoord <= this.node.offsetHeight) {
      yCoord += this.node.offsetWidth / 30;
      this.ctx.moveTo(0, yCoord);
      this.ctx.lineTo(this.node.offsetWidth, yCoord);
    }

    this.ctx.strokeStyle = '#4fc4fa';
    this.ctx.stroke();
  }
}

export {Canvas}