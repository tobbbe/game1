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

/***/ "./core/config.ts":
/*!************************!*\
  !*** ./core/config.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar config = {};\r\nconfig.backgroundCanvas = document.getElementById('background-canvas');\r\nconfig.gameCanvas = document.getElementById('game-canvas');\r\nconfig.mouseCanvas = document.getElementById('mouse-canvas');\r\nconfig.gameCtx = config.gameCanvas.getContext('2d');\r\nconfig.mouseCtx = config.mouseCanvas.getContext('2d');\r\nconfig.canvasWidth = window.innerWidth;\r\nconfig.canvasHeight = window.innerHeight;\r\nconfig.fps = 30;\r\nconfig.interval = 1000 / config.fps;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (config);\r\n\n\n//# sourceURL=webpack:///./core/config.ts?");

/***/ }),

/***/ "./core/engine.ts":
/*!************************!*\
  !*** ./core/engine.ts ***!
  \************************/
/*! exports provided: units, selectedUnits, game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"units\", function() { return units; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"selectedUnits\", function() { return selectedUnits; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"game\", function() { return game; });\n/* harmony import */ var _mouse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mouse */ \"./core/mouse.ts\");\n/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setup */ \"./core/setup.ts\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ \"./core/config.ts\");\n\r\n\r\n\r\nvar lastTime = (new Date()).getTime();\r\nvar currentTime = 0;\r\nvar delta = 0;\r\nvar units = [];\r\nvar selectedUnits = [];\r\nvar animations = [];\r\nfunction gameLoop() {\r\n    window.requestAnimationFrame(gameLoop);\r\n    currentTime = (new Date()).getTime();\r\n    delta = (currentTime - lastTime);\r\n    if (delta > _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].interval) {\r\n        gameDraw();\r\n        lastTime = currentTime;\r\n    }\r\n}\r\nfunction gameDraw() {\r\n    _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].gameCtx.clearRect(0, 0, _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].canvasWidth, _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].canvasHeight);\r\n    _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mouseCtx.clearRect(0, 0, _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].canvasWidth, _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].canvasHeight);\r\n    _mouse__WEBPACK_IMPORTED_MODULE_0__[\"default\"].drawSelection();\r\n    units.forEach(function (u) { return u.draw(); });\r\n    animations\r\n        .forEach(function (s) {\r\n        _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mouseCtx.fillStyle = s.shape.color;\r\n        _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mouseCtx.fillRect(s.shape.x, s.shape.y, s.shape.w, s.shape.h);\r\n    });\r\n    animations = animations.filter(function (s) { return s.stopAt > currentTime; });\r\n}\r\n_mouse__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init(_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mouseCanvas, animations);\r\nvar game = {\r\n    start: function () {\r\n        Object(_setup__WEBPACK_IMPORTED_MODULE_1__[\"setup\"])();\r\n        gameLoop();\r\n    },\r\n    addUnit: function (unit) { return units.push(unit); }\r\n};\r\n\n\n//# sourceURL=webpack:///./core/engine.ts?");

/***/ }),

/***/ "./core/mouse.ts":
/*!***********************!*\
  !*** ./core/mouse.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine */ \"./core/engine.ts\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ \"./core/config.ts\");\n\r\n\r\nvar selection = { x: 0, y: 0, startX: 0, startY: 0 };\r\nvar leftClickIsDown = false;\r\nfunction init(canvas, animations) {\r\n    canvas.oncontextmenu = function (e) {\r\n        e.preventDefault();\r\n        // TODO: move this to eventemitter\r\n        var distanceBetweenUnits = 2;\r\n        var unitRowSize = _engine__WEBPACK_IMPORTED_MODULE_0__[\"selectedUnits\"].reduce(function (pre, x) { return pre + x.getSize() + distanceBetweenUnits; }, 0);\r\n        var dist = unitRowSize / _engine__WEBPACK_IMPORTED_MODULE_0__[\"selectedUnits\"].length;\r\n        var nextXPos = e.clientX - (unitRowSize / 2);\r\n        _engine__WEBPACK_IMPORTED_MODULE_0__[\"selectedUnits\"].forEach(function (unit) {\r\n            nextXPos += dist;\r\n            unit.setFuturePosition(Math.floor(nextXPos), e.clientY);\r\n        });\r\n        animations.push({\r\n            stopAt: new Date().getTime() + 200,\r\n            shape: { x: e.clientX - 5, y: e.clientY - 5, w: 10, h: 10, color: 'red' }\r\n        });\r\n    };\r\n    canvas.onpointermove = function (e) {\r\n        if (!leftClickIsDown)\r\n            return;\r\n        selection.x = e.clientX;\r\n        selection.y = e.clientY;\r\n    };\r\n    canvas.onpointerdown = function (e) {\r\n        canvas.setPointerCapture(e.pointerId);\r\n        if (e.button === 2)\r\n            return;\r\n        // TODO: do this with eventemitter instead\r\n        if (!e.ctrlKey) {\r\n            _engine__WEBPACK_IMPORTED_MODULE_0__[\"selectedUnits\"].length = 0;\r\n            _engine__WEBPACK_IMPORTED_MODULE_0__[\"units\"].forEach(function (unit) { return unit.selected(false); });\r\n        }\r\n        leftClickIsDown = true;\r\n        selection.startX = e.clientX;\r\n        selection.startY = e.clientY;\r\n        selection.x = e.clientX;\r\n        selection.y = e.clientY;\r\n    };\r\n    canvas.onpointerup = function (e) {\r\n        canvas.releasePointerCapture(e.pointerId);\r\n        // TODO: do this with eventemitter instead\r\n        var wasClick = Math.floor(selection.x) === Math.floor(selection.startX) && Math.floor(selection.y) === Math.floor(selection.startY);\r\n        _engine__WEBPACK_IMPORTED_MODULE_0__[\"units\"].forEach(function (unit) {\r\n            if ((wasClick && unit.isInsideMouseClick()) || unit.isInsideMouseSelection()) {\r\n                unit.selected(true);\r\n                _engine__WEBPACK_IMPORTED_MODULE_0__[\"selectedUnits\"].push(unit);\r\n            }\r\n        });\r\n        selection.x = 0;\r\n        selection.y = 0;\r\n        selection.startX = 0;\r\n        selection.startY = 0;\r\n        leftClickIsDown = false;\r\n    };\r\n}\r\nfunction drawSelection() {\r\n    if (leftClickIsDown) {\r\n        _config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mouseCtx.fillStyle = 'yellow';\r\n        _config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mouseCtx.fillRect(selection.startX, selection.startY, selection.x - selection.startX, selection.y - selection.startY);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n    selection: selection,\r\n    init: init,\r\n    drawSelection: drawSelection\r\n});\r\n\n\n//# sourceURL=webpack:///./core/mouse.ts?");

/***/ }),

/***/ "./core/setup.ts":
/*!***********************!*\
  !*** ./core/setup.ts ***!
  \***********************/
/*! exports provided: setup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setup\", function() { return setup; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./core/config.ts\");\n\r\nfunction setup() {\r\n    // set widths of canvases\r\n    _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].backgroundCanvas.width = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].canvasWidth;\r\n    _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].gameCanvas.width = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].canvasWidth;\r\n    _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mouseCanvas.width = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].canvasWidth;\r\n    // set height of canvases\r\n    _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].backgroundCanvas.height = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].canvasHeight;\r\n    _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].gameCanvas.height = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].canvasHeight;\r\n    _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mouseCanvas.height = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].canvasHeight;\r\n}\r\n\n\n//# sourceURL=webpack:///./core/setup.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"unitFactory\", function() { return unitFactory; });\n/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../core/config */ \"./core/config.ts\");\n/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../core/utils */ \"./core/utils.ts\");\n/* harmony import */ var _core_mouse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../core/mouse */ \"./core/mouse.ts\");\n\r\n\r\n\r\nvar unitFactory = {\r\n    create: function () {\r\n        var size = 6;\r\n        var x = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__[\"randomNumber\"])(0 + size * 3, _core_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].canvasWidth - size * 3);\r\n        var y = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__[\"randomNumber\"])(0 + size * 3, _core_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].canvasHeight - size * 3);\r\n        var isSelected = false;\r\n        var futureX = null;\r\n        var futureY = null;\r\n        var speed = 3;\r\n        function calcSpeed(futurePos, currPos) {\r\n            var remainingDistance = futurePos - currPos;\r\n            remainingDistance = remainingDistance < 0 ? -remainingDistance : remainingDistance;\r\n            return remainingDistance < speed ? remainingDistance : speed;\r\n        }\r\n        var Unit = /** @class */ (function () {\r\n            function Unit() {\r\n            }\r\n            Unit.prototype.draw = function () {\r\n                this.move();\r\n                var isInsideSelection = this.isInsideMouseSelection();\r\n                _core_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].gameCtx.fillStyle = isInsideSelection ? 'blue' :\r\n                    isSelected ? 'red' : 'white';\r\n                _core_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].gameCtx.fillRect(x, y, size, size);\r\n            };\r\n            Unit.prototype.move = function () {\r\n                if (!futureX && !futureY)\r\n                    return;\r\n                if (futureX) {\r\n                    x += futureX > x ? calcSpeed(futureX, x) : -calcSpeed(futureX, x);\r\n                }\r\n                else {\r\n                    futureX = null;\r\n                }\r\n                if (futureY) {\r\n                    y += futureY > y ? calcSpeed(futureY, y) : -calcSpeed(futureY, y);\r\n                }\r\n                else {\r\n                    futureY = null;\r\n                }\r\n            };\r\n            Unit.prototype.setFuturePosition = function (x, y) {\r\n                futureX = x - (size / 2);\r\n                futureY = y - size / 2;\r\n            };\r\n            Unit.prototype.isInsideMouseSelection = function () {\r\n                return x > _core_mouse__WEBPACK_IMPORTED_MODULE_2__[\"default\"].selection.startX && x < _core_mouse__WEBPACK_IMPORTED_MODULE_2__[\"default\"].selection.x && y > _core_mouse__WEBPACK_IMPORTED_MODULE_2__[\"default\"].selection.startY && y < _core_mouse__WEBPACK_IMPORTED_MODULE_2__[\"default\"].selection.y;\r\n            };\r\n            Unit.prototype.isInsideMouseClick = function () {\r\n                return x - size <= _core_mouse__WEBPACK_IMPORTED_MODULE_2__[\"default\"].selection.startX\r\n                    && x + (size * 2) >= _core_mouse__WEBPACK_IMPORTED_MODULE_2__[\"default\"].selection.x\r\n                    && y - size <= _core_mouse__WEBPACK_IMPORTED_MODULE_2__[\"default\"].selection.startY\r\n                    && y + (2 * size) >= _core_mouse__WEBPACK_IMPORTED_MODULE_2__[\"default\"].selection.y;\r\n            };\r\n            Unit.prototype.selected = function (val) {\r\n                isSelected = val;\r\n            };\r\n            Unit.prototype.getSize = function () {\r\n                return size;\r\n            };\r\n            return Unit;\r\n        }());\r\n        return new Unit();\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./game-objects/unit.ts?");

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