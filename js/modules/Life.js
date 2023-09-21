import {Canvas} from './Canvas.js'

class Life {
  constructor(canvas, counter, startButton) {
    this.canvas = new Canvas(canvas);
    this.currentGen = [];
    this.count = 0;
    this.countNode = counter;
    this.startButton = startButton;
    this.isStart = false;
  }

  init() {
    this.setField();
    this.canvas.node.addEventListener('mouseup', this.canvasClickHandler.bind(this));
    this.startButton.addEventListener('click', this.start.bind(this));
  }

  setField() {
    const n = 30, m = 30;
    for (let i = 0; i < m; i++) {
      this.currentGen[i] = [];
      for(let j = 0; j < n; j++) {
        this.currentGen[i][j] = 0;
      }
    }
  }

  start() {
    if (this.isStart) return;
    this.isStart = true;
    this.changeGen();
  }

  stop() {
    this.isStart = false;
  }

  canvasClickHandler(event) {
    const x = Math.floor(event.offsetX / (this.canvas.node.offsetWidth / 30));
    const y = Math.floor(event.offsetY / (this.canvas.node.offsetWidth / 30));
    (this.currentGen[y][x] == 1) ? this.currentGen[y][x] = 0: this.currentGen[y][x] = 1; 
    this.canvas.drawField(this.currentGen);
  }
 
  changeGen() {
    if (!this.isStart) return;
    const newGen = [];

    const fpm = (i) => {
      if (i == 0) return 30;
      else return i;
    }
    
    const fpp = (i) => {
      if (i == 29) return -1;
      else return i;
    }

    for (let i = 0; i < 30; i++) {
      newGen[i] = [];
      for(let j = 0; j < 30; j++) {
        let aliveNeighborsCount = 0;
        if (this.currentGen[fpm(i)-1][j] == 1) aliveNeighborsCount++; // up
        if (this.currentGen[i][fpp(j) + 1] == 1) aliveNeighborsCount++; // right
        if (this.currentGen[fpp(i) + 1][j] == 1) aliveNeighborsCount++; // bottom
        if (this.currentGen[i][fpm(j) - 1] == 1) aliveNeighborsCount++; // left
        if (this.currentGen[fpm(i)-1][fpp(j) + 1] == 1) aliveNeighborsCount++; // up right
        if (this.currentGen[fpp(i)+1][fpp(j) + 1] == 1) aliveNeighborsCount++; // bottom right
        if (this.currentGen[fpp(i)+1][fpm(j) - 1] == 1) aliveNeighborsCount++; // bottom left
        if (this.currentGen[fpm(i)-1][fpm(j) - 1] == 1) aliveNeighborsCount++; // up left
        
        if (aliveNeighborsCount == 2 && this.currentGen[i][j] == 1) newGen[i][j] = 1;
        else if (aliveNeighborsCount == 3) newGen[i][j] = 1
        else newGen[i][j] = 0;
      }
    }

    if (this.currentGen.toString() === newGen.toString()) this.stop();
    this.currentGen = newGen;
    this.canvas.drawField(this.currentGen);
    this.count++;
    this.countNode.innerHTML = this.count;
    this.timer = setTimeout(this.changeGen.bind(this), 150);
  }
}

export{Life};