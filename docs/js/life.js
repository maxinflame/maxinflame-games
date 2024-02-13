(()=>{"use strict";class t{constructor(t,e){this.node=t,this.ctx=this.node.getContext("2d"),this._cellsNumber=e,this.cellSize,this.setSize(),this.drawGrid()}get cellsNumber(){return this._cellsNumber}set cellsNumber(t){this._cellsNumber=t}setSize(){this.node.width=this.node.offsetWidth,this.node.height=this.node.offsetWidth*(this.cellsNumber[1]/this.cellsNumber[0]),this.cellSize=this.node.offsetWidth/this.cellsNumber[0]}drawField(t){this.ctx.clearRect(0,0,this.node.offsetWidth,this.node.offsetHeight),this.ctx.fillStyle="#de13de";for(let e=0;e<this.cellsNumber[0];e++)for(let s=0;s<this.cellsNumber[1];s++)1===t[e][s]&&this.ctx.fillRect(s*this.cellSize,e*this.cellSize,this.cellSize,this.cellSize);this.drawGrid()}drawEl(t,e,s){this.ctx.fillStyle=t,this.ctx.fillRect(e*this.cellSize,s*this.cellSize,this.cellSize,this.cellSize)}drawGrid(){this.ctx.beginPath();let t=0,e=0;for(;t<=this.node.offsetWidth;)t+=this.cellSize,this.ctx.moveTo(t,0),this.ctx.lineTo(t,this.node.offsetHeight);for(;e<=this.node.offsetHeight;)e+=this.cellSize,this.ctx.moveTo(0,e),this.ctx.lineTo(this.node.offsetWidth,e);this.ctx.strokeStyle="#4fc4fa",this.ctx.stroke()}clear(){this.ctx.clearRect(0,0,this.node.offsetWidth,this.node.offsetHeight)}}const e=document.querySelector("[data-canvas]"),s=document.querySelector("[data-count]"),i=document.querySelector("[data-start]"),n=document.querySelector("[data-reset]");let h;h=window.innerWidth<1024?[20,20]:[30,30],new class{constructor(e,s,i,n,h){this.canvas=new t(e,h),this.currentGen=[],this.count=0,this.countNode=s,this.startButton=i,this.resetButton=n,this.isStart=!1,this.init()}init(){this.setField(),this.canvas.node.addEventListener("mouseup",this.canvasClickHandler.bind(this)),this.startButton.addEventListener("click",this.startButtonClickHandler.bind(this)),this.resetButton.addEventListener("click",this.reset.bind(this))}setField(){for(let t=0;t<this.canvas.cellsNumber[0];t++){this.currentGen[t]=[];for(let e=0;e<this.canvas.cellsNumber[1];e++)this.currentGen[t][e]=0}}start(){this.isStart||(this.isStart=!0,this.startButton.classList.remove("button--start"),this.startButton.classList.add("button--stop"),this.startButton.innerHTML="Stop",this.changeGen())}stop(){this.isStart=!1,this.startButton.classList.add("button--start"),this.startButton.classList.remove("button--stop"),this.startButton.innerHTML="Start"}reset(){this.stop(),this.count=0,this.countNode.innerHTML=this.count,this.setField(),this.canvas.drawField(this.currentGen)}startButtonClickHandler(){this.isStart?this.stop():this.start()}canvasClickHandler(t){const e=Math.floor(t.offsetX/(this.canvas.node.offsetWidth/this.canvas.cellsNumber[0])),s=Math.floor(t.offsetY/(this.canvas.node.offsetHeight/this.canvas.cellsNumber[0]));1==this.currentGen[s][e]?this.currentGen[s][e]=0:this.currentGen[s][e]=1,this.canvas.drawField(this.currentGen)}changeGen(){if(!this.isStart)return;const t=[],e=t=>0==t?this.canvas.cellsNumber[0]:t,s=t=>t==this.canvas.cellsNumber[0]-1?-1:t;for(let i=0;i<this.canvas.cellsNumber[0];i++){t[i]=[];for(let n=0;n<this.canvas.cellsNumber[0];n++){let h=0;1==this.currentGen[e(i)-1][n]&&h++,1==this.currentGen[i][s(n)+1]&&h++,1==this.currentGen[s(i)+1][n]&&h++,1==this.currentGen[i][e(n)-1]&&h++,1==this.currentGen[e(i)-1][s(n)+1]&&h++,1==this.currentGen[s(i)+1][s(n)+1]&&h++,1==this.currentGen[s(i)+1][e(n)-1]&&h++,1==this.currentGen[e(i)-1][e(n)-1]&&h++,2==h&&1==this.currentGen[i][n]?t[i][n]=1:t[i][n]=3==h?1:0}}this.currentGen.toString()===t.toString()&&this.stop(),this.currentGen=t,this.canvas.drawField(this.currentGen),this.count++,this.countNode.innerHTML=this.count,this.timer=setTimeout(this.changeGen.bind(this),150)}}(e,s,i,n,h)})();