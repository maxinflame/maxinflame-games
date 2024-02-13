/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/Canvas.js":
/*!**********************************!*\
  !*** ./src/js/modules/Canvas.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Canvas: () => (/* binding */ Canvas)\n/* harmony export */ });\n/* harmony import */ var _variables_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variables.js */ \"./src/js/modules/variables.js\");\n\r\n\r\n\r\nclass Canvas {  \r\n  constructor(node, cellsNumber) {\r\n    this.node = node;\r\n    this.ctx = this.node.getContext('2d');\r\n    this._cellsNumber = cellsNumber;\r\n    this.cellSize;\r\n    this.setSize();\r\n    this.drawGrid();\r\n  }\r\n\r\n  get cellsNumber() {\r\n    return this._cellsNumber;\r\n  }\r\n\r\n  set cellsNumber(value) {\r\n    this._cellsNumber = value;\r\n  }\r\n\r\n  setSize() {\r\n    this.node.width = this.node.offsetWidth;\r\n    this.node.height = this.node.offsetWidth * (this.cellsNumber[1] / this.cellsNumber[0]);\r\n    this.cellSize = this.node.offsetWidth / this.cellsNumber[0];\r\n  }\r\n\r\n  drawField(arr) {\r\n    this.ctx.clearRect(0, 0, this.node.offsetWidth, this.node.offsetHeight);\r\n    this.ctx.fillStyle = _variables_js__WEBPACK_IMPORTED_MODULE_0__.PURPLE;\r\n    for (let i = 0; i < this.cellsNumber[0]; i++) {\r\n      for(let j = 0; j < this.cellsNumber[1]; j++) {\r\n        if (arr[i][j] === 1) {\r\n          this.ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);\r\n        }\r\n      }\r\n    }\r\n    this.drawGrid();\r\n  }\r\n\r\n  drawEl(color, x, y) {\r\n    this.ctx.fillStyle = color;\r\n    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)\r\n  }\r\n\r\n  drawGrid() {\r\n    this.ctx.beginPath();\r\n    \r\n    let xCoord = 0;\r\n    let yCoord = 0;\r\n\r\n    while (xCoord <= this.node.offsetWidth) {\r\n      xCoord += this.cellSize;\r\n      this.ctx.moveTo(xCoord, 0);\r\n      this.ctx.lineTo(xCoord, this.node.offsetHeight);\r\n    }\r\n\r\n    while (yCoord <= this.node.offsetHeight) {\r\n      yCoord += this.cellSize;\r\n      this.ctx.moveTo(0, yCoord);\r\n      this.ctx.lineTo(this.node.offsetWidth, yCoord);\r\n    }\r\n\r\n    this.ctx.strokeStyle = _variables_js__WEBPACK_IMPORTED_MODULE_0__.LIGHT_LINES_COLOR;\r\n    this.ctx.stroke();\r\n  }\r\n\r\n  clear() {\r\n    this.ctx.clearRect(0, 0, this.node.offsetWidth, this.node.offsetHeight);\r\n  }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://maxinflame-games/./src/js/modules/Canvas.js?");

/***/ }),

/***/ "./src/js/modules/FullscreenButton.js":
/*!********************************************!*\
  !*** ./src/js/modules/FullscreenButton.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FullscreenButton: () => (/* binding */ FullscreenButton)\n/* harmony export */ });\nclass FullscreenButton {\r\n  constructor() {\r\n    this._button = document.querySelector('[data-fullscreen-button]');\r\n    this._gameWrapper = document.querySelector('[data-game-wrapper]');\r\n\r\n    this._openFullscreen = this._openFullscreen.bind(this);\r\n    this._closeFullscreen = this._closeFullscreen.bind(this);\r\n    this._buttonHandler = this._buttonHandler.bind(this);\r\n\r\n    this._button.addEventListener('click', this._buttonHandler);\r\n  }\r\n\r\n  _openFullscreen() {\r\n    this._gameWrapper.requestFullscreen();\r\n    this._gameWrapper.classList.add('fullscreen-mode');\r\n  }\r\n\r\n  _closeFullscreen() {\r\n    document.exitFullscreen();\r\n    this._gameWrapper.classList.remove('fullscreen-mode');\r\n  }\r\n\r\n  _buttonHandler() {\r\n    this._gameWrapper.classList.contains('fullscreen-mode')\r\n      ? this._closeFullscreen()\r\n      : this._openFullscreen();\r\n  }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://maxinflame-games/./src/js/modules/FullscreenButton.js?");

/***/ }),

/***/ "./src/js/modules/Snake.js":
/*!*********************************!*\
  !*** ./src/js/modules/Snake.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Snake: () => (/* binding */ Snake)\n/* harmony export */ });\n/* harmony import */ var _Canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas.js */ \"./src/js/modules/Canvas.js\");\n/* harmony import */ var _SubmitScoreForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SubmitScoreForm.js */ \"./src/js/modules/SubmitScoreForm.js\");\n/* harmony import */ var _variables_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./variables.js */ \"./src/js/modules/variables.js\");\n\r\n\r\n\r\n\r\nclass TailPart {\r\n  constructor(x, y) {\r\n    this.x = x;\r\n    this.y = y;\r\n    this.color = _variables_js__WEBPACK_IMPORTED_MODULE_2__.PURPLE;\r\n  }\r\n}\r\n\r\nclass Snake {\r\n  constructor(canvas, cellsNumbers, startPopup, _gameOverPopup, retryButton, scoreNode, highScoreNode) {\r\n    this.cellsNumbers = cellsNumbers;\r\n    this.canvasNode = canvas;\r\n    this.canvas = new _Canvas_js__WEBPACK_IMPORTED_MODULE_0__.Canvas(this.canvasNode, cellsNumbers);\r\n    this.startPopup = startPopup;\r\n    this._gameOverPopup = _gameOverPopup;\r\n    this.retryButton = retryButton\r\n    this.scoreNode = scoreNode;\r\n    this.highScoreNode = highScoreNode;\r\n    this.playButton = document.querySelector('[data-play-button]');\r\n    this.head;\r\n    this.food;\r\n    this.tail = [];\r\n    this.isDirectionChanded = false;\r\n    this.isGameStarted = false;\r\n    this.score = 0;\r\n    this.highScore;\r\n    this._submitScoreForm = new _SubmitScoreForm_js__WEBPACK_IMPORTED_MODULE_1__.SubmitScoreForm(document.querySelector('[data-submit-score-form]'))\r\n\r\n    this._startGame = this._startGame.bind(this);\r\n    this._pauseButtonHandler = this._pauseButtonHandler.bind(this);\r\n    this._upHandler = this._upHandler.bind(this);\r\n    this._leftHandler = this._leftHandler.bind(this);\r\n    this._downHandler = this._downHandler.bind(this);\r\n    this._rightHandler = this._rightHandler.bind(this);\r\n\r\n    this._init();\r\n  }\r\n\r\n  _init() {\r\n    this._createHead(10, 10, 0, 1);\r\n    this._createTail();\r\n    this._createFood();\r\n    window.addEventListener('keydown', this._keydownHandler.bind(this));\r\n    this._drawSnake();\r\n    this.canvasNode.addEventListener('click', this._startGame);\r\n    this.retryButton.addEventListener('click', this._startGame);\r\n    this.playButton.addEventListener('click', this._startGame);\r\n    this.highScore = localStorage.getItem('snakeHighScore') ? localStorage.getItem('snakeHighScore') : 0;\r\n    this.highScoreNode.innerHTML = this.highScore;\r\n\r\n    document.querySelector('[data-mobile-up]').addEventListener('click', this._upHandler);\r\n    document.querySelector('[data-mobile-left]').addEventListener('click', this._leftHandler);\r\n    document.querySelector('[data-mobile-down]').addEventListener('click', this._downHandler);\r\n    document.querySelector('[data-mobile-right]').addEventListener('click', this._rightHandler);\r\n  }\r\n\r\n  _createHead(xCoord, yCoord, Vy, Vx) {\r\n    this.head = {\r\n      x: xCoord,\r\n      y: yCoord,\r\n      Vy: Vy,\r\n      Vx: Vx,\r\n      color: _variables_js__WEBPACK_IMPORTED_MODULE_2__.PURPLE,\r\n    }\r\n  }\r\n\r\n  _createTail() {\r\n    const xCoord = this.head.x;\r\n    const yCoord = this.head.y;\r\n\r\n    for(let i = 1; i <= 4; i++) {\r\n      this.tail.push(new TailPart(xCoord - i, yCoord));\r\n    }\r\n  }\r\n\r\n  _drawSnake() {\r\n    this.canvas.drawEl(this.head.color, this.head.x, this.head.y);\r\n    this.tail.forEach(item => this.canvas.drawEl(item.color, item.x, item.y));\r\n  }\r\n\r\n  _createFood() {\r\n    this.food = {\r\n      x: Math.floor(Math.random() * this.cellsNumbers[0]),\r\n      y: Math.floor(Math.random() * this.cellsNumbers[1]),\r\n    }\r\n\r\n    if (this.head.x == this.food.x && this.head.y == this.food.y) this._createFood();\r\n    this.tail.forEach(item => {\r\n      if (item.x == this.food.x && item.y == this.food.y) this._createFood()\r\n    })\r\n  }\r\n\r\n  _upHandler() {\r\n    if (this.head.Vy == 1) return;\r\n    this.head.Vy = -1;\r\n    this.head.Vx = 0;\r\n    this.isDirectionChanded = true;\r\n  }\r\n\r\n  _downHandler() {\r\n    if (this.head.Vy == -1) return;\r\n    this.head.Vy = 1;\r\n    this.head.Vx = 0;\r\n    this.isDirectionChanded = true;\r\n  }\r\n  \r\n  _leftHandler() {\r\n    if (this.head.Vx == 1) return;\r\n    this.head.Vx = -1;\r\n    this.head.Vy = 0;\r\n    this.isDirectionChanded = true;\r\n  }\r\n\r\n  _rightHandler() {\r\n    if (this.head.Vx == -1) return;\r\n    this.head.Vx = 1;\r\n    this.head.Vy = 0;\r\n    this.isDirectionChanded = true;\r\n  }\r\n\r\n  _keydownHandler(e) {\r\n    if (!this.isGameStarted) return true;\r\n    if (this.isDirectionChanded) {\r\n      e.preventDefault();\r\n      return;\r\n    }\r\n    switch (e.code) {\r\n      case 'ArrowUp':\r\n      case 'KeyW':\r\n        e.preventDefault();\r\n        this._upHandler();\r\n        break;\r\n      case 'ArrowDown':\r\n      case 'KeyS':\r\n        e.preventDefault();\r\n        this._downHandler();\r\n        break;\r\n      case 'ArrowLeft':\r\n      case 'KeyA':\r\n        e.preventDefault();\r\n        this._leftHandler();\r\n        break;\r\n      case 'ArrowRight':\r\n      case 'KeyD':\r\n        e.preventDefault();\r\n        this._rightHandler();\r\n        break;\r\n      default:\r\n        break;\r\n    }\r\n  }\r\n\r\n  _move() {\r\n    let newHeadX = this.head.x + this.head.Vx;\r\n    let newHeadY = this.head.y + this.head.Vy;\r\n\r\n    this.tail.forEach(item => {\r\n      if (item.x == newHeadX && item.y == newHeadY) {\r\n        this._gameOver();\r\n        return;\r\n      }\r\n    })\r\n\r\n    if (newHeadX > this.cellsNumbers[0] - 1) newHeadX = 0;\r\n    else if (newHeadX < 0) newHeadX = this.cellsNumbers[0] - 1;\r\n\r\n    if (newHeadY > this.cellsNumbers[1] - 1) newHeadY = 0\r\n    else if (newHeadY < 0) newHeadY = this.cellsNumbers[1];\r\n\r\n    if (newHeadX === this.food.x && newHeadY === this.food.y) {\r\n      this._createFood();\r\n      this.score++;\r\n      this.scoreNode.innerHTML = this.score;\r\n\r\n      if (this.score > this.highScore) { \r\n        this.highScoreNode.innerHTML = this.score;\r\n      }\r\n    } else {\r\n      this.tail.pop();\r\n    }\r\n    \r\n    this.tail.unshift(new TailPart(this.head.x, this.head.y))\r\n\r\n    this.head.x = newHeadX;\r\n    this.head.y = newHeadY;\r\n  }\r\n\r\n  _changeFrame() {\r\n    if (!this.isGameStarted) return;\r\n    this.isDirectionChanded = false;\r\n    this._move();\r\n    if (!this.isGameStarted) return;\r\n    this.canvas.clear();\r\n    this._drawSnake();\r\n    this.canvas.drawEl(_variables_js__WEBPACK_IMPORTED_MODULE_2__.GREEN, this.food.x, this.food.y);\r\n    this.canvas.drawGrid();\r\n    setTimeout(this._changeFrame.bind(this), 100);\r\n  }\r\n\r\n  _startGame() {\r\n    this.canvasNode.removeEventListener('click', this._startGame);\r\n    this.playButton.removeEventListener('click', this._startGame);\r\n    this.playButton.addEventListener('click', this._pauseButtonHandler);\r\n    this.playButton.classList.remove('button--start');\r\n    this.playButton.classList.add('button--stop');\r\n    this.playButton.innerHTML = 'Pause';\r\n    this.tail = [];\r\n    this._createHead(10, 10, 0, 1);\r\n    this._createTail();\r\n    this._createFood();\r\n    this.score = 0;\r\n    this.scoreNode.innerHTML = this.score;\r\n    this.startPopup.classList.add('hidden');\r\n    this._gameOverPopup.classList.add('hidden');\r\n    this._gameOverPopup.classList.remove('error');\r\n    this._gameOverPopup.classList.remove('success');\r\n    this.isGameStarted = true;\r\n    this._changeFrame();\r\n  }\r\n\r\n  _pauseButtonHandler() {\r\n    if (this.isGameStarted) {\r\n      this.isGameStarted = false;\r\n      this.playButton.classList.remove('button--stop');\r\n      this.playButton.classList.add('button--start');\r\n      this.playButton.innerHTML = 'Play';\r\n    } else {\r\n      this.isGameStarted = true;\r\n      this.playButton.classList.remove('button--start');\r\n      this.playButton.classList.add('button--stop');\r\n      this.playButton.innerHTML = 'Pause';\r\n      this._changeFrame();\r\n    }\r\n  }\r\n\r\n  _gameOver() {\r\n    const score = this.score;\r\n\r\n    this.isGameStarted = false;\r\n    this._submitScoreForm.updateScore(score);\r\n    this._gameOverPopup.classList.remove('hidden');\r\n    if (score > this.highScore) {\r\n      localStorage.setItem('snakeHighScore', score);\r\n      this.highScore = score;\r\n    }\r\n  }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://maxinflame-games/./src/js/modules/Snake.js?");

/***/ }),

/***/ "./src/js/modules/SubmitScoreForm.js":
/*!*******************************************!*\
  !*** ./src/js/modules/SubmitScoreForm.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SubmitScoreForm: () => (/* binding */ SubmitScoreForm)\n/* harmony export */ });\nclass SubmitScoreForm {\r\n  constructor(form) {\r\n    this._form = form;\r\n    this._scoreInput = form.querySelector('[name=\"score\"]');\r\n    this._popup = form.closest('[data-game-over]');\r\n    this._scoreTable = document.querySelector('[data-result-table]');\r\n\r\n    this._submitHandler = this._submitHandler.bind(this);\r\n\r\n    this._init();\r\n  }\r\n\r\n  _init() {\r\n    this._form.addEventListener('submit', this._submitHandler);\r\n  }\r\n\r\n  async _submitHandler(e) {\r\n    e.preventDefault();\r\n    const url = `${window.location.origin}/scores/snake`;\r\n\r\n    let response = await fetch(url, {\r\n      method: 'POST',\r\n      body: new FormData(this._form),\r\n    })\r\n\r\n    let json = await response.json();\r\n\r\n    if (!response) {\r\n      this._onError();\r\n    } else {\r\n      this._onSuccess(json);\r\n    }\r\n  }\r\n\r\n  _onError() {\r\n    this._popup.classList.add('error');\r\n  }\r\n\r\n  _onSuccess(response) {\r\n    const results = Object.values(response);\r\n\r\n    this._scoreTable.innerHTML = '';\r\n\r\n    results.forEach(res => {\r\n      \r\n      const entries = Object.entries(res)\r\n      \r\n      console.log(entries)\r\n\r\n      const tr = document.createElement('tr');\r\n      const nameCell = document.createElement('td');\r\n      const valueCell = document.createElement('td');\r\n\r\n      nameCell.classList.add('score-table__cell');\r\n      valueCell.classList.add('score-table__cell');\r\n\r\n      nameCell.innerHTML = entries[0][0];\r\n      valueCell.innerHTML = entries[0][1];\r\n\r\n      tr.appendChild(nameCell);\r\n      tr.appendChild(valueCell);\r\n\r\n      this._scoreTable.appendChild(tr)\r\n    })\r\n\r\n    this._popup.classList.add('success')  \r\n  }\r\n\r\n  updateScore(score) {\r\n    this._scoreInput.value = score;\r\n  }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://maxinflame-games/./src/js/modules/SubmitScoreForm.js?");

/***/ }),

/***/ "./src/js/modules/variables.js":
/*!*************************************!*\
  !*** ./src/js/modules/variables.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GREEN: () => (/* binding */ GREEN),\n/* harmony export */   LIGHT_LINES_COLOR: () => (/* binding */ LIGHT_LINES_COLOR),\n/* harmony export */   PURPLE: () => (/* binding */ PURPLE)\n/* harmony export */ });\nconst LIGHT_LINES_COLOR = '#4fc4fa';\r\nconst PURPLE = '#de13de';\r\nconst GREEN = '#5eff00';\r\n\r\n\n\n//# sourceURL=webpack://maxinflame-games/./src/js/modules/variables.js?");

/***/ }),

/***/ "./src/js/snake.js":
/*!*************************!*\
  !*** ./src/js/snake.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Snake_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Snake.js */ \"./src/js/modules/Snake.js\");\n/* harmony import */ var _modules_FullscreenButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/FullscreenButton.js */ \"./src/js/modules/FullscreenButton.js\");\n\r\n\r\n\r\nconst canvas = document.querySelector('[data-canvas]');\r\nconst cellsNumber = [36, 36];\r\nconst startButton = document.querySelector('[data-start]');\r\nconst gameOverPopup = document.querySelector('[data-game-over]');\r\nconst retryButton = gameOverPopup.querySelector('[data-retry]');\r\nconst score = document.querySelector('[data-score]');\r\nconst highScore = document.querySelector('[data-high-score]');\r\n\r\nconst snake = new _modules_Snake_js__WEBPACK_IMPORTED_MODULE_0__.Snake(canvas, cellsNumber, startButton, gameOverPopup, retryButton, score, highScore)\r\nnew _modules_FullscreenButton_js__WEBPACK_IMPORTED_MODULE_1__.FullscreenButton();\n\n//# sourceURL=webpack://maxinflame-games/./src/js/snake.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/snake.js");
/******/ 	
/******/ })()
;