/**
 * @author       Florian Vazelle <ponythugflorian@gmail.com>
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Phaser = require('phaser');
var Joystick = require('./Joystick');

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
