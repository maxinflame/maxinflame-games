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

/***/ "./src/js/life.js":
/*!************************!*\
  !*** ./src/js/life.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Life_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Life.js */ \"./src/js/modules/Life.js\");\n\r\n\r\nconst canvas = document.querySelector('[data-canvas]');\r\nconst counter = document.querySelector('[data-count]');\r\nconst startButton = document.querySelector('[data-start]');\r\nconst resetButton = document.querySelector('[data-reset]')\r\nlet cellsNumber;\r\n\r\nif (window.innerWidth < 1024) {\r\n  cellsNumber = [20, 20]\r\n} else {\r\n  cellsNumber = [30, 30]\r\n}\r\n\r\nconst life = new _modules_Life_js__WEBPACK_IMPORTED_MODULE_0__.Life(canvas, counter, startButton, resetButton, cellsNumber);\n\n//# sourceURL=webpack://maxinflame-games/./src/js/life.js?");

/***/ }),

/***/ "./src/js/modules/Canvas.js":
/*!**********************************!*\
  !*** ./src/js/modules/Canvas.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Canvas: () => (/* binding */ Canvas)\n/* harmony export */ });\n/* harmony import */ var _variables_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variables.js */ \"./src/js/modules/variables.js\");\n\r\n\r\n\r\nclass Canvas {  \r\n  constructor(node, cellsNumber) {\r\n    this.node = node;\r\n    this.ctx = this.node.getContext('2d');\r\n    this._cellsNumber = cellsNumber;\r\n    this.cellSize;\r\n    this.setSize();\r\n    this.drawGrid();\r\n  }\r\n\r\n  get cellsNumber() {\r\n    return this._cellsNumber;\r\n  }\r\n\r\n  set cellsNumber(value) {\r\n    this._cellsNumber = value;\r\n  }\r\n\r\n  setSize() {\r\n    this.node.width = this.node.offsetWidth;\r\n    this.node.height = this.node.offsetWidth * (this.cellsNumber[1] / this.cellsNumber[0]);\r\n    this.cellSize = this.node.offsetWidth / this.cellsNumber[0];\r\n  }\r\n\r\n  drawField(arr) {\r\n    this.ctx.clearRect(0, 0, this.node.offsetWidth, this.node.offsetHeight);\r\n    this.ctx.fillStyle = _variables_js__WEBPACK_IMPORTED_MODULE_0__.PURPLE;\r\n    for (let i = 0; i < this.cellsNumber[0]; i++) {\r\n      for(let j = 0; j < this.cellsNumber[1]; j++) {\r\n        if (arr[i][j] === 1) {\r\n          this.ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);\r\n        }\r\n      }\r\n    }\r\n    this.drawGrid();\r\n  }\r\n\r\n  drawEl(color, x, y) {\r\n    this.ctx.fillStyle = color;\r\n    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)\r\n  }\r\n\r\n  drawGrid() {\r\n    this.ctx.beginPath();\r\n    \r\n    let xCoord = 0;\r\n    let yCoord = 0;\r\n\r\n    while (xCoord <= this.node.offsetWidth) {\r\n      xCoord += this.cellSize;\r\n      this.ctx.moveTo(xCoord, 0);\r\n      this.ctx.lineTo(xCoord, this.node.offsetHeight);\r\n    }\r\n\r\n    while (yCoord <= this.node.offsetHeight) {\r\n      yCoord += this.cellSize;\r\n      this.ctx.moveTo(0, yCoord);\r\n      this.ctx.lineTo(this.node.offsetWidth, yCoord);\r\n    }\r\n\r\n    this.ctx.strokeStyle = _variables_js__WEBPACK_IMPORTED_MODULE_0__.LIGHT_LINES_COLOR;\r\n    this.ctx.stroke();\r\n  }\r\n\r\n  clear() {\r\n    this.ctx.clearRect(0, 0, this.node.offsetWidth, this.node.offsetHeight);\r\n  }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://maxinflame-games/./src/js/modules/Canvas.js?");

/***/ }),

/***/ "./src/js/modules/Life.js":
/*!********************************!*\
  !*** ./src/js/modules/Life.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Life: () => (/* binding */ Life)\n/* harmony export */ });\n/* harmony import */ var _Canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas.js */ \"./src/js/modules/Canvas.js\");\n\r\n\r\nclass Life {\r\n  constructor(canvas, counter, startButton, resetButton, cellsNumber) {\r\n    this.canvas = new _Canvas_js__WEBPACK_IMPORTED_MODULE_0__.Canvas(canvas, cellsNumber);\r\n    this.currentGen = [];\r\n    this.count = 0;\r\n    this.countNode = counter;\r\n    this.startButton = startButton;\r\n    this.resetButton = resetButton;\r\n    this.isStart = false;\r\n    this.init();\r\n  }\r\n\r\n  init() {\r\n    this.setField();\r\n    this.canvas.node.addEventListener('mouseup', this.canvasClickHandler.bind(this));\r\n    this.startButton.addEventListener('click', this.startButtonClickHandler.bind(this));\r\n    this.resetButton.addEventListener('click', this.reset.bind(this));\r\n  }\r\n\r\n  setField() {\r\n    for (let i = 0; i < this.canvas.cellsNumber[0]; i++) {\r\n      this.currentGen[i] = [];\r\n      for(let j = 0; j < this.canvas.cellsNumber[1]; j++) {\r\n        this.currentGen[i][j] = 0;\r\n      }\r\n    }\r\n  }\r\n\r\n  start() {\r\n    if (this.isStart) return;\r\n    this.isStart = true;\r\n    this.startButton.classList.remove('button--start');\r\n    this.startButton.classList.add('button--stop');\r\n    this.startButton.innerHTML = 'Stop';\r\n    this.changeGen();\r\n  }\r\n\r\n  stop() {\r\n    this.isStart = false;\r\n    this.startButton.classList.add('button--start');\r\n    this.startButton.classList.remove('button--stop');\r\n    this.startButton.innerHTML = 'Start';\r\n  }\r\n\r\n  reset() {\r\n    this.stop();\r\n    this.count = 0;\r\n    this.countNode.innerHTML = this.count;\r\n    this.setField();\r\n    this.canvas.drawField(this.currentGen);\r\n  }\r\n\r\n  startButtonClickHandler() {\r\n    if (this.isStart) {\r\n      this.stop();\r\n    } else {\r\n      this.start();\r\n    }\r\n  }\r\n \r\n  canvasClickHandler(event) {\r\n    const x = Math.floor(event.offsetX / (this.canvas.node.offsetWidth / this.canvas.cellsNumber[0]));\r\n    const y = Math.floor(event.offsetY / (this.canvas.node.offsetHeight / this.canvas.cellsNumber[0]));\r\n    (this.currentGen[y][x] == 1) ? this.currentGen[y][x] = 0: this.currentGen[y][x] = 1;\r\n    this.canvas.drawField(this.currentGen);\r\n  }\r\n \r\n  changeGen() {\r\n    if (!this.isStart) return;\r\n    const newGen = [];\r\n\r\n    const fpm = (i) => {\r\n      if (i == 0) return this.canvas.cellsNumber[0];\r\n      else return i;\r\n    }\r\n    \r\n    const fpp = (i) => {\r\n      if (i == this.canvas.cellsNumber[0] - 1) return -1;\r\n      else return i;\r\n    }\r\n\r\n    for (let i = 0; i < this.canvas.cellsNumber[0]; i++) {\r\n      newGen[i] = [];\r\n      for(let j = 0; j < this.canvas.cellsNumber[0]; j++) {\r\n        let aliveNeighborsCount = 0;\r\n        if (this.currentGen[fpm(i)-1][j] == 1) aliveNeighborsCount++; // up\r\n        if (this.currentGen[i][fpp(j) + 1] == 1) aliveNeighborsCount++; // right\r\n        if (this.currentGen[fpp(i) + 1][j] == 1) aliveNeighborsCount++; // bottom\r\n        if (this.currentGen[i][fpm(j) - 1] == 1) aliveNeighborsCount++; // left\r\n        if (this.currentGen[fpm(i)-1][fpp(j) + 1] == 1) aliveNeighborsCount++; // up right\r\n        if (this.currentGen[fpp(i)+1][fpp(j) + 1] == 1) aliveNeighborsCount++; // bottom right\r\n        if (this.currentGen[fpp(i)+1][fpm(j) - 1] == 1) aliveNeighborsCount++; // bottom left\r\n        if (this.currentGen[fpm(i)-1][fpm(j) - 1] == 1) aliveNeighborsCount++; // up left\r\n        \r\n        if (aliveNeighborsCount == 2 && this.currentGen[i][j] == 1) newGen[i][j] = 1;\r\n        else if (aliveNeighborsCount == 3) newGen[i][j] = 1\r\n        else newGen[i][j] = 0;\r\n      }\r\n    }\r\n\r\n    if (this.currentGen.toString() === newGen.toString()) this.stop();\r\n    this.currentGen = newGen;\r\n    this.canvas.drawField(this.currentGen);\r\n    this.count++;\r\n    this.countNode.innerHTML = this.count;\r\n    this.timer = setTimeout(this.changeGen.bind(this), 150);\r\n  }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://maxinflame-games/./src/js/modules/Life.js?");

/***/ }),

/***/ "./src/js/modules/variables.js":
/*!*************************************!*\
  !*** ./src/js/modules/variables.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GREEN: () => (/* binding */ GREEN),\n/* harmony export */   LIGHT_LINES_COLOR: () => (/* binding */ LIGHT_LINES_COLOR),\n/* harmony export */   PURPLE: () => (/* binding */ PURPLE)\n/* harmony export */ });\nconst LIGHT_LINES_COLOR = '#4fc4fa';\r\nconst PURPLE = '#de13de';\r\nconst GREEN = '#5eff00';\r\n\r\n\n\n//# sourceURL=webpack://maxinflame-games/./src/js/modules/variables.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/life.js");
/******/ 	
/******/ })()
;