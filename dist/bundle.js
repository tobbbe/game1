/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./core/engine.ts":
/*!************************!*\
  !*** ./core/engine.ts ***!
  \************************/
/*! exports provided: backgroundCanvas, gameCanvas, mouseCanvas, gameCtx, mouseCtx, canvasWidth, canvasHeight, game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"backgroundCanvas\", function() { return backgroundCanvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gameCanvas\", function() { return gameCanvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mouseCanvas\", function() { return mouseCanvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gameCtx\", function() { return gameCtx; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mouseCtx\", function() { return mouseCtx; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvasWidth\", function() { return canvasWidth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvasHeight\", function() { return canvasHeight; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"game\", function() { return game; });\n/* harmony import */ var _mouse_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mouse-service */ \"./core/mouse-service.ts\");\n\r\nvar backgroundCanvas = document.getElementById('background-canvas');\r\nvar gameCanvas = document.getElementById('game-canvas');\r\nvar mouseCanvas = document.getElementById('mouse-canvas');\r\nvar gameCtx = gameCanvas.getContext('2d');\r\nvar mouseCtx = mouseCanvas.getContext('2d');\r\nvar canvasWidth = window.innerWidth;\r\nvar canvasHeight = window.innerHeight;\r\n// set widths of canvases\r\nbackgroundCanvas.width = canvasWidth;\r\ngameCanvas.width = canvasWidth;\r\nmouseCanvas.width = canvasWidth;\r\n// set height of canvases\r\nbackgroundCanvas.height = canvasHeight;\r\ngameCanvas.height = canvasHeight;\r\nmouseCanvas.height = canvasHeight;\r\nvar lastTime = (new Date()).getTime();\r\nvar currentTime = 0;\r\nvar delta = 0;\r\nvar fps = 30;\r\nvar interval = 1000 / fps;\r\nvar units = [];\r\nvar animations = [];\r\nfunction gameLoop() {\r\n    window.requestAnimationFrame(gameLoop);\r\n    currentTime = (new Date()).getTime();\r\n    delta = (currentTime - lastTime);\r\n    if (delta > interval) {\r\n        gameCtx.clearRect(0, 0, canvasWidth, canvasHeight);\r\n        mouseCtx.clearRect(0, 0, canvasWidth, canvasHeight);\r\n        gameDraw();\r\n        lastTime = currentTime;\r\n    }\r\n}\r\nfunction gameDraw() {\r\n    units.forEach(function (u) { return u.draw(); });\r\n    if (_mouse_service__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isPointerDown()) {\r\n        mouseCtx.fillStyle = 'yellow';\r\n        mouseCtx.fillRect(_mouse_service__WEBPACK_IMPORTED_MODULE_0__[\"default\"].selection.startX, _mouse_service__WEBPACK_IMPORTED_MODULE_0__[\"default\"].selection.startY, _mouse_service__WEBPACK_IMPORTED_MODULE_0__[\"default\"].selection.x - _mouse_service__WEBPACK_IMPORTED_MODULE_0__[\"default\"].selection.startX, _mouse_service__WEBPACK_IMPORTED_MODULE_0__[\"default\"].selection.y - _mouse_service__WEBPACK_IMPORTED_MODULE_0__[\"default\"].selection.startY);\r\n    }\r\n    animations\r\n        .forEach(function (s) {\r\n        mouseCtx.fillStyle = s.shape.color;\r\n        mouseCtx.fillRect(s.shape.x, s.shape.y, s.shape.w, s.shape.h);\r\n    });\r\n    animations = animations.filter(function (s) { return s.stopAt > currentTime; });\r\n}\r\n_mouse_service__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init(mouseCanvas, animations);\r\nvar game = {\r\n    start: gameLoop,\r\n    addUnit: function (unit) { return units.push(unit); }\r\n};\r\n\n\n//# sourceURL=webpack:///./core/engine.ts?");

/***/ }),

/***/ "./core/mouse-service.ts":
/*!*******************************!*\
  !*** ./core/mouse-service.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar selection = {\r\n    x: 0,\r\n    y: 0,\r\n    startX: 0,\r\n    startY: 0\r\n};\r\nvar leftClickIsDown = false;\r\nfunction init(canvas, animations) {\r\n    canvas.oncontextmenu = function (e) {\r\n        e.preventDefault();\r\n        if (!leftClickIsDown)\r\n            return;\r\n        animations.push({\r\n            stopAt: new Date().getTime() + 200,\r\n            shape: { x: e.clientX - 5, y: e.clientY - 5, w: 10, h: 10, color: 'red' }\r\n        });\r\n    };\r\n    canvas.onpointermove = function (e) {\r\n        if (!leftClickIsDown)\r\n            return;\r\n        selection.x = e.clientX;\r\n        selection.y = e.clientY;\r\n    };\r\n    canvas.onpointerdown = function (e) {\r\n        canvas.setPointerCapture(e.pointerId);\r\n        leftClickIsDown = true;\r\n        selection.startX = e.clientX;\r\n        selection.startY = e.clientY;\r\n        selection.x = e.clientX;\r\n        selection.y = e.clientY;\r\n    };\r\n    canvas.onpointerup = function (e) {\r\n        canvas.releasePointerCapture(e.pointerId);\r\n        leftClickIsDown = false;\r\n    };\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n    selection: selection,\r\n    isPointerDown: function () { return leftClickIsDown; },\r\n    init: init\r\n});\r\n\n\n//# sourceURL=webpack:///./core/mouse-service.ts?");

/***/ }),

/***/ "./core/utils.ts":
/*!***********************!*\
  !*** ./core/utils.ts ***!
  \***********************/
/*! exports provided: randomNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"randomNumber\", function() { return randomNumber; });\nfunction randomNumber(min, max) {\r\n    if (min === void 0) { min = 0; }\r\n    if (max === void 0) { max = 1; }\r\n    return Math.floor(Math.random() * (max - min + 1)) + min;\r\n}\r\n\n\n//# sourceURL=webpack:///./core/utils.ts?");

/***/ }),

/***/ "./game-objects/unit.ts":
/*!******************************!*\
  !*** ./game-objects/unit.ts ***!
  \******************************/
/*! exports provided: unitFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"unitFactory\", function() { return unitFactory; });\n/* harmony import */ var _core_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../core/engine */ \"./core/engine.ts\");\n/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../core/utils */ \"./core/utils.ts\");\n\r\n\r\nvar unitFactory = {\r\n    create: function () {\r\n        var size = 6;\r\n        var x = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__[\"randomNumber\"])(0 + size * 3, _core_engine__WEBPACK_IMPORTED_MODULE_0__[\"canvasWidth\"] - size * 3);\r\n        var y = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__[\"randomNumber\"])(0 + size * 3, _core_engine__WEBPACK_IMPORTED_MODULE_0__[\"canvasHeight\"] - size * 3);\r\n        var Unit = /** @class */ (function () {\r\n            function Unit() {\r\n            }\r\n            Unit.prototype.draw = function () {\r\n                _core_engine__WEBPACK_IMPORTED_MODULE_0__[\"gameCtx\"].fillStyle = 'white';\r\n                _core_engine__WEBPACK_IMPORTED_MODULE_0__[\"gameCtx\"].fillRect(x, y, size, size);\r\n            };\r\n            Unit.prototype.move = function () {\r\n                x += 2;\r\n                y += 2;\r\n            };\r\n            return Unit;\r\n        }());\r\n        return new Unit();\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./game-objects/unit.ts?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/engine */ \"./core/engine.ts\");\n/* harmony import */ var _game_objects_unit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-objects/unit */ \"./game-objects/unit.ts\");\n\r\n\r\nfor (var i = 0; i < 20; i++) {\r\n    _core_engine__WEBPACK_IMPORTED_MODULE_0__[\"game\"].addUnit(_game_objects_unit__WEBPACK_IMPORTED_MODULE_1__[\"unitFactory\"].create());\r\n}\r\n_core_engine__WEBPACK_IMPORTED_MODULE_0__[\"game\"].start();\r\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ })

/******/ });