var globals = require('@jest/globals');

var Phaser = require('phaser');
var Joystick = require('../Joystick');
var VJoyPlugin = require('../VJoyPlugin');

var GamePlay = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
    
    function GamePlay ()
    {
        Phaser.Scene.call(this, {
            key: 'GamePlay'
        });
    },

    preload: function ()
    {
        this.load.scenePlugin('VJoyPlugin', '../VJoyPlugin.js', null, 'vjoy');
    }
});

globals.describe('Game Scene', function ()
{
    globals.test('Scene is created correctly', function ()
    {
        var scene = new GamePlay();
        globals.expect(scene.sys.config.key).toBe('GamePlay');
    });
});

globals.describe('VJoy Scene Plugin', function ()
{
    // Squelch console.log output.
    globals.jest.spyOn(console, 'log').mockImplementation(globals.jest.fn());

    // Running game calls window.focus method.
    globals.jest.spyOn(window, 'focus').mockImplementation(globals.jest.fn());

    globals.it('Instantiates Plugin by Preload Step', function ()
    {
        var scene = new GamePlay();

        var config = {
            type: Phaser.HEADLESS,
            scene: [ scene ]
        };

        var game = new Phaser.Game(config);
        game.textures.emit(Phaser.Textures.Events.READY); // Trigger preload scene method

        // Check that VJoyPlugin can be instantiated
        var plugin = new VJoyPlugin(scene, game.plugins);

        globals.expect(plugin).toBeTruthy();
        globals.expect(plugin instanceof VJoyPlugin).toBe(true);

        // Check joystick factory is correctly initialize
        globals.expect(scene.add.joystick).toBeTruthy();
        globals.expect(typeof scene.add.joystick).toEqual('function');

        // Impossible to load textures in this test, mock sprite management
        globals.jest.spyOn(scene.add, 'sprite').mockImplementation(function () { return { x: 0, y: 0 }; });
        globals.jest.spyOn(scene.add, 'layer').mockImplementation(function () { return { setVisible: globals.jest.fn(), each: globals.jest.fn() }; });

        var joystick = scene.add.joystick({
            sprites: {
                base: 'vjoy_base',
                body: 'vjoy_body',
                cap: 'vjoy_cap'
            },
            singleDirection: false,
            maxDistanceInPixels: 200,
            device: 0 // 0 for mouse pointer (computer), 1 for touch pointer (mobile)
        });

        globals.expect(joystick).toBeTruthy();
        globals.expect(joystick instanceof Joystick).toEqual(true);
    });

    // Inspired by https://github.com/agogpixel/phaser3-plugin-project-starter
    globals.it('Instantiates Plugin by Game Config', function ()
    {
        var scene;
        var game;

        var config = {
            type: Phaser.HEADLESS,
            scene: {
                init: function ()
                {
                    scene = this; // eslint-disable-line consistent-this
                }
            },
            plugins: {
                scene: [ { key: 'VJoyPlugin', plugin: VJoyPlugin, mapping: 'vjoy', start: true } ]
            },
            callbacks: {
                postBoot: function () { game.loop.stop(); }
            }
        };

        game = new Phaser.Game(config);
        game.textures.emit(Phaser.Textures.Events.READY); // Trigger preload scene method
    
        // Check joystick factory is correctly initialize
        globals.expect(scene.add.joystick).toBeTruthy();
        globals.expect(typeof scene.add.joystick).toEqual('function');

        // Impossible to load textures in this test, mock sprite management
        globals.jest.spyOn(scene.add, 'sprite').mockImplementation(function () { return { x: 0, y: 0 }; });
        globals.jest.spyOn(scene.add, 'layer').mockImplementation(function () { return { setVisible: globals.jest.fn(), each: globals.jest.fn() }; });
        
        var joystick = scene.add.joystick({
            sprites: {
                base: 'vjoy_base',
                body: 'vjoy_body',
                cap: 'vjoy_cap'
            },
            singleDirection: false,
            maxDistanceInPixels: 200,
            device: 0 // 0 for mouse pointer (computer), 1 for touch pointer (mobile)
        });

        globals.expect(joystick).toBeTruthy();
        globals.expect(joystick instanceof Joystick).toEqual(true);
    });
});
