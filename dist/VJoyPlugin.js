(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("VJoyPlugin", [], factory);
	else if(typeof exports === 'object')
		exports["VJoyPlugin"] = factory();
	else
		root["VJoyPlugin"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VJoyPlugin; });
/* harmony import */ var _Joystick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var VJoyPlugin = /*#__PURE__*/function (_Phaser$Plugins$Scene) {
  _inherits(VJoyPlugin, _Phaser$Plugins$Scene);

  function VJoyPlugin(scene, pluginManager) {
    var _this;

    _classCallCheck(this, VJoyPlugin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VJoyPlugin).call(this, scene, pluginManager));
    _this.joysticks = []; // Register our new Game Object type

    pluginManager.registerGameObject('joystick', _this.addJoystick.bind(_assertThisInitialized(_this)), function (config) {
      return _this.add(config.settings, config.joystickClass);
    });
    return _this;
  }

  _createClass(VJoyPlugin, [{
    key: "addJoystick",
    value: function addJoystick(settings, joystickClass) {
      if (!joystickClass) {
        joystickClass = _Joystick__WEBPACK_IMPORTED_MODULE_0__["default"];
      }

      var joystick = new joystickClass(this.scene, settings);
      this.joysticks.push(joystick);
      return joystick;
    }
    /**
     * If this is a Scene Plugin (i.e. installed into a Scene) then this method is called when the Scene boots.
     * By this point the plugin properties `scene` and `systems` will have already been set.
     * In here you can listen for Scene events and set-up whatever you need for this plugin to run.
     * @returns {void}
     */

  }, {
    key: "boot",
    value: function boot() {
      var eventEmitter = this.systems.events;
      eventEmitter.on('update', this.update, this);
      eventEmitter.on('destroy', this.destroy, this);
    }
    /**
     * Internal update method, called by the PluginManager.
     *
     * @protected
     * @returns {void}
     */

  }, {
    key: "update",
    value: function update() {
      this.joysticks.forEach(function (joystick) {
        joystick.update();
      });
    }
    /**
     * Destroys this Weapon.
     * You must release everything in here, all references, all objects, free it all up.
     * @returns {void}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.pluginManager = null;
      this.game = null;
      this.scene = null;
      this.systems = null;
    }
  }]);

  return VJoyPlugin;
}(Phaser.Plugins.ScenePlugin);



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Joystick; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Joystick = /*#__PURE__*/function () {
  function Joystick(scene, settings) {
    _classCallCheck(this, Joystick);

    this.scene = scene;
    this.cursors = {
      deltaX: 0,
      deltaY: 0
    };
    this.initialPoint = {
      x: 0,
      y: 0
    };
    this.settings = {
      singleDirection: settings.singleDirection === undefined || settings.singleDirection === null ? true : settings.singleDirection,
      maxDistanceInPixels: settings.maxDistanceInPixels === undefined || settings.maxDistanceInPixels === null ? 200 : settings.maxDistanceInPixels,
      device: settings.device === undefined || settings.device === null ? 0 : settings.device
    };
    this.imageGroup = [];
    this.imageGroup.push(this.scene.add.sprite(0, 0, settings.sprites.cap));

    for (var i = 0; i < this.settings.maxDistanceInPixels; i += 100) {
      this.imageGroup.push(this.scene.add.sprite(0, 0, settings.sprites.body));
    }

    this.imageGroup.push(this.scene.add.sprite(0, 0, settings.sprites.base));
    this.active = true;
    this.remove();
  }
  /**
   * For create the Joystick
   * @method create
   * @param {Array} - Coordinates of pointer.
   */


  _createClass(Joystick, [{
    key: "create",
    value: function create(_ref) {
      var position = _ref.position;

      if (!this.active) {
        this.active = true;
        this.imageGroup.forEach(function (sprite) {
          sprite.visible = true;
          sprite.setScrollFactor(0);
          sprite.x = position.x;
          sprite.y = position.y;
        });
        this.initialPoint = {
          x: position.x,
          y: position.y
        };
      }
    }
    /**
     * To get the cursors attribute
     * @method getCursors
     * @return {Object}
     */

  }, {
    key: "getCursors",
    value: function getCursors() {
      return this.cursors;
    }
    /**
     * To define cursors
     * @method setDirection
     * @param {Array} - Coordinates of pointer (A Pointer object encapsulates both mouse and touch input within Phaser.)
     */

  }, {
    key: "setDirection",
    value: function setDirection(pointers) {
      if (!this.active) {
        return;
      }

      var pointer = pointers[this.settings.device].position;
      var deltaX = pointer.x - this.initialPoint.x;
      var deltaY = pointer.y - this.initialPoint.y;
      var dist = Math.hypot(deltaX, deltaY);
      var maxDistanceInPixels = this.settings.maxDistanceInPixels;

      if (this.settings.singleDirection) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          deltaY = 0;
          pointer.y = this.initialPoint.y;
        } else {
          deltaX = 0;
          pointer.x = this.initialPoint.x;
        }
      }

      var angle = Math.atan2(deltaY, deltaX);

      if (dist > maxDistanceInPixels) {
        deltaX = Math.cos(angle) * maxDistanceInPixels;
        deltaY = Math.sin(angle) * maxDistanceInPixels;
      }

      this.cursors = {
        deltaX: deltaX,
        deltaY: deltaY
      };
      this.imageGroup.forEach(function (sprite, index) {
        sprite.x = this.initialPoint.x + deltaX * index / 3;
        sprite.y = this.initialPoint.y + deltaY * index / 3;
      }, this);
    }
  }, {
    key: "update",
    value: function update() {
      var pointers = this.scene.input.manager.pointers;
      this.setDirection(pointers);
    }
    /**
     * For remove the Joystick
     * @method remove
     */

  }, {
    key: "remove",
    value: function remove() {
      if (this.active) {
        this.active = false;
        this.imageGroup.forEach(function (sprite) {
          sprite.visible = false;
        });
        this.cursors = {
          deltaX: 0,
          deltaY: 0
        };
      }
    }
  }]);

  return Joystick;
}();



/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=VJoyPlugin.js.map