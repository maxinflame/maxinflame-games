(()=>{"use strict";const t="#de13de";class e{constructor(t,e){this.node=t,this.ctx=this.node.getContext("2d"),this._cellsNumber=e,this.cellSize,this.setSize(),this.drawGrid()}get cellsNumber(){return this._cellsNumber}set cellsNumber(t){this._cellsNumber=t}setSize(){this.node.width=this.node.offsetWidth,this.node.height=this.node.offsetWidth*(this.cellsNumber[1]/this.cellsNumber[0]),this.cellSize=this.node.offsetWidth/this.cellsNumber[0]}drawField(e){this.ctx.clearRect(0,0,this.node.offsetWidth,this.node.offsetHeight),this.ctx.fillStyle=t;for(let t=0;t<this.cellsNumber[0];t++)for(let s=0;s<this.cellsNumber[1];s++)1===e[t][s]&&this.ctx.fillRect(s*this.cellSize,t*this.cellSize,this.cellSize,this.cellSize);this.drawGrid()}drawEl(t,e,s){this.ctx.fillStyle=t,this.ctx.fillRect(e*this.cellSize,s*this.cellSize,this.cellSize,this.cellSize)}drawGrid(){this.ctx.beginPath();let t=0,e=0;for(;t<=this.node.offsetWidth;)t+=this.cellSize,this.ctx.moveTo(t,0),this.ctx.lineTo(t,this.node.offsetHeight);for(;e<=this.node.offsetHeight;)e+=this.cellSize,this.ctx.moveTo(0,e),this.ctx.lineTo(this.node.offsetWidth,e);this.ctx.strokeStyle="#4fc4fa",this.ctx.stroke()}clear(){this.ctx.clearRect(0,0,this.node.offsetWidth,this.node.offsetHeight)}}class s{constructor(e,s){this.x=e,this.y=s,this.color=t}}const i=document.querySelector("[data-canvas]"),h=document.querySelector("[data-start]"),a=document.querySelector("[data-game-over]"),r=a.querySelector("[data-retry]"),o=document.querySelector("[data-score]"),d=document.querySelector("[data-high-score]");new class{constructor(t,s,i,h,a,r,o){this.cellsNumbers=s,this.canvasNode=t,this.canvas=new e(this.canvasNode,s),this.startPopup=i,this._gameOverPopup=h,this.retryButton=a,this.scoreNode=r,this.highScoreNode=o,this.playButton=document.querySelector("[data-play-button]"),this.head,this.food,this.tail=[],this.isDirectionChanded=!1,this.isGameStarted=!1,this.score=0,this.highScore,this._startGame=this._startGame.bind(this),this._pauseButtonHandler=this._pauseButtonHandler.bind(this),this._upHandler=this._upHandler.bind(this),this._leftHandler=this._leftHandler.bind(this),this._downHandler=this._downHandler.bind(this),this._rightHandler=this._rightHandler.bind(this),this._init()}_init(){this._createHead(10,10,0,1),this._createTail(),this._createFood(),window.addEventListener("keydown",this._keydownHandler.bind(this)),this._drawSnake(),this.canvasNode.addEventListener("click",this._startGame),this.retryButton.addEventListener("click",this._startGame),this.highScore=localStorage.getItem("snakeHighScore")?localStorage.getItem("snakeHighScore"):0,this.highScoreNode.innerHTML=this.highScore,document.querySelector("[data-mobile-up]").addEventListener("click",this._upHandler),document.querySelector("[data-mobile-left]").addEventListener("click",this._leftHandler),document.querySelector("[data-mobile-down]").addEventListener("click",this._downHandler),document.querySelector("[data-mobile-right]").addEventListener("click",this._rightHandler)}_createHead(e,s,i,h){this.head={x:e,y:s,Vy:i,Vx:h,color:t}}_createTail(){const t=this.head.x,e=this.head.y;for(let i=1;i<=4;i++)this.tail.push(new s(t-i,e))}_drawSnake(){this.canvas.drawEl(this.head.color,this.head.x,this.head.y),this.tail.forEach((t=>this.canvas.drawEl(t.color,t.x,t.y)))}_createFood(){this.food={x:Math.floor(Math.random()*this.cellsNumbers[0]),y:Math.floor(Math.random()*this.cellsNumbers[1])},this.head.x==this.food.x&&this.head.y==this.food.y&&this._createFood(),this.tail.forEach((t=>{t.x==this.food.x&&t.y==this.food.y&&this._createFood()}))}_upHandler(){1!=this.head.Vy&&(this.head.Vy=-1,this.head.Vx=0,this.isDirectionChanded=!0)}_downHandler(){-1!=this.head.Vy&&(this.head.Vy=1,this.head.Vx=0,this.isDirectionChanded=!0)}_leftHandler(){1!=this.head.Vx&&(this.head.Vx=-1,this.head.Vy=0,this.isDirectionChanded=!0)}_rightHandler(){-1!=this.head.Vx&&(this.head.Vx=1,this.head.Vy=0,this.isDirectionChanded=!0)}_keydownHandler(t){if(this.isDirectionChanded)t.preventDefault();else switch(t.code){case"ArrowUp":case"KeyW":t.preventDefault(),this._upHandler();break;case"ArrowDown":case"KeyS":t.preventDefault(),this._downHandler();break;case"ArrowLeft":case"KeyA":t.preventDefault(),this._leftHandler();break;case"ArrowRight":case"KeyD":t.preventDefault(),this._rightHandler()}}_move(){let t=this.head.x+this.head.Vx,e=this.head.y+this.head.Vy;this.tail.forEach((s=>{s.x!=t||s.y!=e||this._gameOver()})),t>this.cellsNumbers[0]-1?t=0:t<0&&(t=this.cellsNumbers[0]-1),e>this.cellsNumbers[1]-1?e=0:e<0&&(e=this.cellsNumbers[1]),t===this.food.x&&e===this.food.y?(this._createFood(),this.score++,this.scoreNode.innerHTML=this.score,this.score>this.highScore&&(this.highScoreNode.innerHTML=this.score)):this.tail.pop(),this.tail.unshift(new s(this.head.x,this.head.y)),this.head.x=t,this.head.y=e}_changeFrame(){this.isGameStarted&&(this.isDirectionChanded=!1,this._move(),this.isGameStarted&&(this.canvas.clear(),this._drawSnake(),this.canvas.drawEl("#5eff00",this.food.x,this.food.y),this.canvas.drawGrid(),setTimeout(this._changeFrame.bind(this),100)))}_startGame(){this.canvasNode.removeEventListener("click",this._startGame),this.playButton.removeEventListener("click",this._startGame),this.playButton.addEventListener("click",this._pauseButtonHandler),this.playButton.classList.remove("button--start"),this.playButton.classList.add("button--stop"),this.playButton.innerHTML="Pause",this.tail=[],this._createHead(10,10,0,1),this._createTail(),this._createFood(),this.score=0,this.scoreNode.innerHTML=this.score,this.startPopup.classList.add("hidden"),this._gameOverPopup.classList.add("hidden"),this.isGameStarted=!0,this._changeFrame()}_pauseButtonHandler(){this.isGameStarted?(this.isGameStarted=!1,this.playButton.classList.remove("button--stop"),this.playButton.classList.add("button--start"),this.playButton.innerHTML="Play"):(this.isGameStarted=!0,this.playButton.classList.remove("button--start"),this.playButton.classList.add("button--stop"),this.playButton.innerHTML="Pause",this._changeFrame())}_gameOver(){if(this.isGameStarted=!1,this._gameOverPopup.classList.remove("hidden"),this.score>this.highScore){const t=this.score;localStorage.setItem("snakeHighScore",t),this.highScore=this.score}}}(i,[36,36],h,a,r,o,d),new class{constructor(){this._button=document.querySelector("[data-fullscreen-button]"),this._gameWrapper=document.querySelector("[data-game-wrapper]"),this._openFullscreen=this._openFullscreen.bind(this),this._closeFullscreen=this._closeFullscreen.bind(this),this._buttonHandler=this._buttonHandler.bind(this),this._button.addEventListener("click",this._buttonHandler)}_openFullscreen(){this._gameWrapper.requestFullscreen(),this._gameWrapper.classList.add("fullscreen-mode")}_closeFullscreen(){document.exitFullscreen(),this._gameWrapper.classList.remove("fullscreen-mode")}_buttonHandler(){this._gameWrapper.classList.contains("fullscreen-mode")?this._closeFullscreen():this._openFullscreen()}}})();