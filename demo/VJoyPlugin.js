(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("phaser"));
	else if(typeof define === 'function' && define.amd)
		define(["phaser"], factory);
	else if(typeof exports === 'object')
		exports["VJoyPlugin"] = factory(require("phaser"));
	else
		root["VJoyPlugin"] = factory(root["Phaser"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE_phaser__) {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Joystick.js":
/*!*********************!*\
  !*** ./Joystick.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @author       Florian Vazelle <ponythugflorian@gmail.com>
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Phaser = __webpack_require__(/*! phaser */ "phaser");

/**
 * @classdesc
 * [description]
 *
 * @class Joystick
 * @memberOf Phaser.GameObjects
 * @constructor
 *
 * @param {Phaser.Scene} scene - [description]
 * @param {object} [settings] - [description]
 */
var Joystick = new Phaser.Class({
    
    Extends: Phaser.GameObjects.GameObject,

    Mixins: [
        Phaser.GameObjects.Components.Transform
    ],

    initialize:

    function Joystick (scene, settings)
    {
        console.log('  [Joystick] constructor');

        Phaser.GameObjects.GameObject.call(this, scene, 'Joystick');

        /**
         * [description]
         *
         * @name Phaser.GameObjects.Joystick#cursors
         * @type {Phaser.Math.Vector2}
         */
        this.cursors = new Phaser.Math.Vector2(0, 0);

        /**
         * [description]
         *
         * @name Phaser.GameObjects.Joystick#singleDirection
         * @type {boolean}
         * @default true
         */
        this.singleDirection = (settings.singleDirection === undefined) ? true : settings.singleDirection;

        /**
         * [description]
         *
         * @name Phaser.GameObjects.Joystick#maxDistanceInPixels
         * @type {number}
         * @default 200
         */
        this.maxDistanceInPixels = (settings.maxDistanceInPixels === undefined) ? 200 : settings.maxDistanceInPixels;

        /**
         * [description]
         *
         * @name Phaser.GameObjects.Joystick#device
         * @type {number}
         * @default 0
         */
        this.device = (settings.device === undefined) ? 0 : settings.device;

        // Instanciate the Joystick sprites.
        var imageGroup = [];
        imageGroup.push(this.scene.add.sprite(0, 0, settings.sprites.cap));
        for (var i = 0; i < this.maxDistanceInPixels; i += 100)
        {
            imageGroup.push(this.scene.add.sprite(0, 0, settings.sprites.body));
        }
        imageGroup.push(this.scene.add.sprite(0, 0, settings.sprites.base));

        // Manage the Joystick sprites with a Layer.
        this.layer = this.scene.add.layer(imageGroup);
        this.layer.setVisible(false);

        // Set Joystick position to (0, 0).
        this.setPosition(0, 0);
        
        // Disable update logic of this Joystick.
        this.setActive(false);

        // Add input callback on the current scene.
        this.scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.onKeyDown, this);
        this.scene.input.on(Phaser.Input.Events.POINTER_UP, this.onKeyUp, this);

        // Add current Joystick to the scene, it will be added to the Update List.
        this.scene.add.existing(this);
    },

    /**
     * The read-only deltaX of this Joystick.
     *
     * @name Phaser.GameObjects.Joystick#deltaX
     * @type {number}
     */
    deltaX: {

        get: function ()
        {
            return this.cursors.x;
        }

    },

    /**
     * The read-only deltaY of this Joystick.
     *
     * @name Phaser.GameObjects.Joystick#deltaY
     * @type {number}
     */
    deltaY: {

        get: function ()
        {
            return this.cursors.y;
        }

    },

    /**
     * [description]
     *
     * @method Phaser.GameObjects.Joystick#onKeyDown
     * 
     * @param {Phaser.Input.Pointer} pointer - 
     */
    onKeyDown: function (pointer)
    {
        console.log('  [Joystick] onKeyDown', pointer);

        // Enable update logic of this Joystick.
        this.setActive(true);

        // Show sprites.
        this.layer.setVisible(true);
        this.layer.each(function (gameObject)
        {
            gameObject.setScrollFactor(0);

            gameObject.x = pointer.x;
            gameObject.y = pointer.y;
        }, this);

        // Set position of this Joystick to the pointer position.
        this.setPosition(pointer.x, pointer.y);
    },

    /**
     * [description]
     *
     * @method Phaser.GameObjects.Joystick#onKeyUp
     * 
     * @param {Phaser.Input.Pointer} pointer - 
     */
    onKeyUp: function (pointer)
    {
        console.log('  [Joystick] onKeyUp', pointer);
        
        // Disable update logic of this Joystick.
        this.setActive(false);

        // Hide sprites.
        this.layer.setVisible(false);

        // Reset cursors position.
        this.cursors = new Phaser.Math.Vector2(0, 0);
    },

    /**
     * Updates this Joystick.
     * 
     * Update cursors to compute new delta vector and update position of the sprites.
     *
     * @method Phaser.GameObjects.Joystick#preUpdate
     *
     * @param {number} time - The current timestamp as generated by the Request Animation Frame or SetTimeout.
     * @param {number} delta - The delta time, in ms, elapsed since the last frame.
     */
    preUpdate: function (time, delta)
    {
        console.log('  [Joystick] preUpdate', time, delta);

        // Retrieve player input pointers.
        var pointers = this.scene.sys.input.manager.pointers;
        
        // Get pointer corresponding to used device.
        var pointer = pointers[this.device].position;
        
        // Compute delta pointer position.
        var deltaX = pointer.x - this.x;
        var deltaY = pointer.y - this.y;
        
        //
        var dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // 
        if (this.singleDirection)
        {
            if (Math.abs(deltaX) > Math.abs(deltaY))
            {
                deltaY = 0;
            }
            else
            {
                deltaX = 0;
            }
        }
        
        //
        var angle = Math.atan2(deltaY, deltaX);
        
        // 
        if (dist > this.maxDistanceInPixels)
        {
            deltaX = Math.cos(angle) * this.maxDistanceInPixels;
            deltaY = Math.sin(angle) * this.maxDistanceInPixels;
        }

        // Update cursors.
        this.cursors = new Phaser.Math.Vector2(deltaX, deltaY);
        
        var index = 0;
        this.layer.each(function (gameObject)
        {
            gameObject.x = this.x + (deltaX) * index / 3;
            gameObject.y = this.y + (deltaY) * index / 3;
            index++;
        }, this);
    }
});

module.exports = Joystick;


/***/ }),

/***/ "./VJoyPlugin.js":
/*!***********************!*\
  !*** ./VJoyPlugin.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * @author       Florian Vazelle <ponythugflorian@gmail.com>
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Phaser = __webpack_require__(/*! phaser */ "phaser");
var Joystick = __webpack_require__(/*! ./Joystick */ "./Joystick.js");

/**
 * @classdesc
 * A class allowing to use a joystick in a computer or mobile game.
 * 
 * This is an external plugin which you can include in your game by preloading it:
 *
 * ```javascript
 * this.load.scenePlugin('VJoyPlugin', 'plugins/VJoyPlugin.min.js', 'VJoyPlugin', 'vjoy'):
 * ```
 *
 * Once loaded you can create a virtual Joystick using the `vjoy` property of a Scene:
 *
 * ```javascript
 * var joystick = this.vjoy.add({
 *      sprites: {
 *          base: 'vjoy_base',
 *          body: 'vjoy_body',
 *          cap: 'vjoy_cap'
 *      },
 *      singleDirection: false,
 *      maxDistanceInPixels: 200,
 *      device: 0 // 0 for mouse pointer (computer), 1 for touch pointer (mobile)
 *   });
 * ```
 *
 * See the examples for more information.
 *
 * @class VJoyPlugin
 * @constructor
 *
 * @param {Phaser.Scene} scene - A reference to the Scene that has installed this plugin.
 * @param {Phaser.Plugins.PluginManager} pluginManager - A reference to the Plugin Manager.
 */
var VJoyPlugin = new Phaser.Class({

    Extends: Phaser.Plugins.ScenePlugin,

    initialize:
    
    function VJoyPlugin (scene, pluginManager)
    {
        console.log('[VJoyPlugin] constructor');

        Phaser.Plugins.ScenePlugin.call(this, scene, pluginManager);

        // Register the Joystick Game Object
        pluginManager.registerGameObject('joystick', this.joystickFactory, this.joystickCreator);
    },

    /**
     * Creates a new Joystick Game Object and adds it to the Scene.
     *
     * @method Phaser.GameObjects.GameObjectFactory#joystick
     * 
     * @param {boolean} singleDirection - The horizontal position of this Game Object.
     * @param {number} maxDistanceInPixels - The vertical position of this Game Object.
     * @param {number} device - The z position of this Game Object.
     *
     * @return {Phaser.GameObjects.Joystick} The Game Object that was created.
     */
    joystickFactory: function (settings)
    {
        console.log('[VJoyPlugin] joystickFactory');
        console.assert(this instanceof Phaser.GameObjects.GameObjectFactory); // eslint-disable-line no-console

        return new Joystick(this.scene, settings);
    },

    /**
     * Creates a new Joystick Game Object and returns it.
     *
     * @method Phaser.GameObjects.GameObjectCreator#joystick
     * 
     * @param {object} config - The configuration object this Game Object will use to create itself.
     * @param {boolean} [addToScene] - Add this Game Object to the Scene after creating it? If set this argument overrides the `add` property in the config object.
     *
     * @return {Phaser.GameObjects.Joystick} The Game Object that was created.
     */
    joystickCreator: function (config, addToScene)
    {
        console.log('[VJoyPlugin] joystickCreator');
        console.assert(this instanceof Phaser.GameObjects.GameObjectCreator); // eslint-disable-line no-console

        if (config === undefined) { config = {}; }

        var settings = Phaser.Utils.Objects.GetValue(config, 'settings', null);
    
        var joystick = new Joystick(this.scene, settings);
    
        if (addToScene !== undefined)
        {
            config.add = addToScene;
        }
    
        Phaser.GameObjects.BuildGameObject(this.scene, joystick, config);
    
        return joystick;
    },

    /**
     * This method is called automatically, only once, when the Scene is first created.
     * Do not invoke it directly.
     *
     * @method VJoyPlugin#boot
     * @private
     */
    boot: function ()
    {
        console.log('[VJoyPlugin] boot');

        this.systems.events.once('destroy', this.destroy, this);
        this.game.events.once('destroy', this.gameDestroy, this);
    },

    /**
     * The Scene that owns this plugin is being destroyed.
     *
     * We need to shutdown and then kill off all external references.
     *
     * @method VJoyPlugin#destroy
     * @private
     */
    destroy: function ()
    {
        console.log('[VJoyPlugin] destroy');

        this.game = null;
        this.scene = null;
        this.systems = null;
    },

    /**
     * The Game that owns this plugin is being destroyed.
     *
     * Dispose of the Scene Renderer and remove the Game Objects.
     *
     * @method VJoyPlugin#gameDestroy
     * @private
     */
    gameDestroy: function ()
    {
        console.log('[VJoyPlugin] gameDestroy');

        this.pluginManager.removeGameObject('joystick', true, true);
        this.pluginManager = null;
    }
});

module.exports = VJoyPlugin;


/***/ }),

/***/ "phaser":
/*!******************************************************************************************!*\
  !*** external {"root":"Phaser","commonjs":"phaser","commonjs2":"phaser","amd":"phaser"} ***!
  \******************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_phaser__;

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./VJoyPlugin.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=VJoyPlugin.js.map