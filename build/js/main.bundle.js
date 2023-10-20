/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/app.ts":
/*!***********************!*\
  !*** ./src/ts/app.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n\nvar __importDefault = this && this.__importDefault || function (mod) {\n  return mod && mod.__esModule ? mod : {\n    \"default\": mod\n  };\n};\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nvar figureArr_1 = __webpack_require__(/*! ./figureArr */ \"./src/ts/figureArr.ts\");\nvar gameResult_1 = __importDefault(__webpack_require__(/*! ./gameResult */ \"./src/ts/gameResult.ts\"));\nvar answerHeader = document.getElementById('answerHeader');\nvar playerImg = document.getElementById('playerImg');\nvar botImg = document.getElementById('botImg');\nvar ansverPanel = document.getElementsByClassName('ansver-panel')[0];\nvar playAgainBtn = document.getElementById('playAgainBtn');\nvar buttons = document.querySelectorAll('.ansver-panel > button');\nplayAgainBtn.onclick = function (event) {\n  event.preventDefault();\n  clearGame();\n};\nbuttons.forEach(function (btn) {\n  btn.addEventListener('click', function handleClick(event) {\n    event.preventDefault();\n    var btn = event.target;\n    play(btn.value);\n  });\n});\nfunction clearGame() {\n  setAnswerHeader();\n  toogleAnsverPanel(true);\n  setImages();\n}\nfunction play(player) {\n  var bot = (0, figureArr_1.genirateFigure)();\n  setImages(player, bot);\n  var result = new gameResult_1.default(player, bot);\n  setAnswerHeader(result.Header, result.HeaderColor);\n  toogleAnsverPanel(false);\n}\nfunction setAnswerHeader(header, headerColor) {\n  if (header === void 0) {\n    header = '';\n  }\n  if (headerColor === void 0) {\n    headerColor = '#000';\n  }\n  answerHeader.style.color = headerColor;\n  answerHeader.textContent = header;\n}\nfunction toogleAnsverPanel(show) {\n  ansverPanel.style.display = show ? 'block' : 'none';\n  playAgainBtn.style.display = show ? 'none' : 'block';\n}\nfunction setImages(player, bot) {\n  if (player === void 0) {\n    player = undefined;\n  }\n  if (bot === void 0) {\n    bot = undefined;\n  }\n  playerImg.className = player ? player.toLocaleLowerCase() : '';\n  botImg.className = bot ? bot.toLocaleLowerCase() : '';\n}\n\n//# sourceURL=webpack:///./src/ts/app.ts?");

/***/ }),

/***/ "./src/ts/figureArr.ts":
/*!*****************************!*\
  !*** ./src/ts/figureArr.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.genirateFigure = exports.figureArr = void 0;\nexports.figureArr = ['Rock', 'Scissors', 'Paper', 'Lizards', 'Spock'];\nfunction genirateFigure() {\n  return exports.figureArr[Math.floor(Math.random() * 5)];\n}\nexports.genirateFigure = genirateFigure;\n\n//# sourceURL=webpack:///./src/ts/figureArr.ts?");

/***/ }),

/***/ "./src/ts/gameResult.ts":
/*!******************************!*\
  !*** ./src/ts/gameResult.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nvar winHeaders_1 = __webpack_require__(/*! ./winHeaders */ \"./src/ts/winHeaders.ts\");\nvar GameResult = function () {\n  function GameResult(palyer, bot) {\n    this.Header = '';\n    var playerWin;\n    if (palyer !== bot) {\n      var h = winHeaders_1.WinHeaders.get(\"\".concat(palyer, \"-\").concat(bot));\n      this.Header = h !== null && h !== void 0 ? h : winHeaders_1.WinHeaders.get(\"\".concat(bot, \"-\").concat(palyer));\n      playerWin = !!h;\n    }\n    this.HeaderColor = playerWin === true ? 'green' : playerWin === false ? 'red' : '#5f5e5e';\n    this.Header += ' ' + (playerWin ? 'Вы победили!' : playerWin === false ? 'Вы проиграли!' : 'Ничья.');\n  }\n  return GameResult;\n}();\nexports[\"default\"] = GameResult;\n\n//# sourceURL=webpack:///./src/ts/gameResult.ts?");

/***/ }),

/***/ "./src/ts/winHeaders.ts":
/*!******************************!*\
  !*** ./src/ts/winHeaders.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.WinHeaders = void 0;\nexports.WinHeaders = new Map([['Rock-Scissors', 'Камень ломает ножницы.'], ['Rock-Lizards', 'Камень бьёт ящерицу.'], ['Scissors-Paper', 'Ножницы режут бумагу.'], ['Scissors-Lizards', 'Ножницы обезглавливают ящерицу.'], ['Paper-Spock', 'Бумага опровергает Спока.'], ['Paper-Rock', 'Бумага накрывает камень.'], ['Lizards-Paper', 'Ящерицу съедает бумагу.'], ['Lizards-Spock', 'Ящерица отравляет Спока.'], ['Spock-Scissors', 'Спок ломает ножницы.'], ['Spock-Rock', 'Спок испаряет камень.']]);\n\n//# sourceURL=webpack:///./src/ts/winHeaders.ts?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/app.ts");
/******/ 	
/******/ })()
;