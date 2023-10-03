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

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar figureArr_1 = __webpack_require__(/*! ./figureArr */ \"./src/ts/figureArr.ts\");\nvar gameResults_1 = __webpack_require__(/*! ./gameResults */ \"./src/ts/gameResults.ts\");\nvar winResult_1 = __importDefault(__webpack_require__(/*! ./winResult */ \"./src/ts/winResult.ts\"));\nvar copyright = document.getElementById('copyrightYear');\ncopyright.textContent = new Date().getFullYear().toString();\nvar answerHeader = document.getElementById('answerHeader');\nvar yourAnswerImg = document.getElementById('yourAnswerImg');\nvar botAnswerImg = document.getElementById('botAnswerImg');\nvar ansverPanel = document.getElementsByClassName('ansver-panel')[0];\nvar playAgainBtn = document.getElementById('playAgainBtn');\nvar buttons = document.querySelectorAll('.ansver-panel > button');\nplayAgainBtn.onclick = function (event) {\n    event.preventDefault();\n    ansverPanel.style.display = 'block';\n    playAgainBtn.style.display = 'none';\n    answerHeader.textContent = '';\n    botAnswerImg.className = '';\n    yourAnswerImg.className = '';\n};\nbuttons.forEach(function (btn) {\n    btn.addEventListener('click', function handleClick(event) {\n        event.preventDefault();\n        ansverPanel.style.display = 'none';\n        playAgainBtn.style.display = 'block';\n        var btn = event.target;\n        play(btn.value);\n    });\n});\nfunction play(yourAnswer) {\n    yourAnswerImg.className = yourAnswer.toLocaleLowerCase();\n    var botAnswer = genirateFigure();\n    botAnswerImg.className = botAnswer.toLocaleLowerCase();\n    var result = firstPayerWin(yourAnswer, botAnswer);\n    var winColor = result.Win === true ? 'green' : result.Win === false ? 'red' : '#5f5e5e';\n    answerHeader.style.color = winColor;\n    answerHeader.textContent = result.Header;\n    playAgainBtn.style.display = 'block';\n}\nfunction firstPayerWin(figure1, figure2) {\n    var result = new winResult_1.default();\n    if (figure1 !== figure2) {\n        var x = gameResults_1.gameResults.get(\"\".concat(figure1, \"-\").concat(figure2));\n        result.Header = x !== null && x !== void 0 ? x : gameResults_1.gameResults.get(\"\".concat(figure2, \"-\").concat(figure1));\n        result.Win = !!x;\n    }\n    result.Header += ' ' + (result.Win ? 'Вы побидили!' : result.Win === false ? 'Вы проиграли!' : 'Ничья.');\n    return result;\n}\nfunction genirateFigure() {\n    return figureArr_1.figureArr[Math.floor(Math.random() * 5)];\n}\n\n\n//# sourceURL=webpack:///./src/ts/app.ts?");

/***/ }),

/***/ "./src/ts/figureArr.ts":
/*!*****************************!*\
  !*** ./src/ts/figureArr.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.figureArr = void 0;\nexports.figureArr = ['Rock', 'Scissors', 'Paper', 'Lizards', 'Spock'];\n\n\n//# sourceURL=webpack:///./src/ts/figureArr.ts?");

/***/ }),

/***/ "./src/ts/gameResults.ts":
/*!*******************************!*\
  !*** ./src/ts/gameResults.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.gameResults = void 0;\nexports.gameResults = new Map([\n    ['Rock-Scissors', 'Камень ломает ножницы.'],\n    ['Rock-Lizards', 'Камень бьёт ящерицу.'],\n    ['Scissors-Paper', 'Ножницы режут бумагу.'],\n    ['Scissors-Lizards', 'Ножницы обезглавливают ящерицу.'],\n    ['Paper-Spock', 'Бумага опровергает Спока.'],\n    ['Paper-Rock', 'Бумага накрывает камень.'],\n    ['Lizards-Paper', 'Ящерицу съедает бумагу.'],\n    ['Lizards-Spock', 'Ящерица отравляет Спока.'],\n    ['Spock-Scissors', 'Спок ломает ножницы.'],\n    ['Spock-Rock', 'Спок испаряет камень.'],\n]);\n\n\n//# sourceURL=webpack:///./src/ts/gameResults.ts?");

/***/ }),

/***/ "./src/ts/winResult.ts":
/*!*****************************!*\
  !*** ./src/ts/winResult.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar WinResult = (function () {\n    function WinResult() {\n        this.Header = '';\n    }\n    return WinResult;\n}());\nexports[\"default\"] = WinResult;\n\n\n//# sourceURL=webpack:///./src/ts/winResult.ts?");

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