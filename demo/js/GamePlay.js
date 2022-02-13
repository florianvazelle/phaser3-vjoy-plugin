var gamePlayState = new Phaser.Class({
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
        this.load.image('player', 'assets/player.png');

        this.load.image('vjoy_base', 'assets/base.png');
        this.load.image('vjoy_body', 'assets/body.png');
        this.load.image('vjoy_cap', 'assets/cap.png');

        this.load.scenePlugin('VJoyPlugin', './VJoyPlugin.js', 'VJoyPlugin', 'vjoy');
    },

    create: function ()
    {
        this.sprite = this.physics.add.sprite(300, 300, 'player').setVelocity(0);
        this.joystick = this.add.joystick({
            sprites: {
                base: 'vjoy_base',
                body: 'vjoy_body',
                cap: 'vjoy_cap'
            },
            singleDirection: false,
            maxDistanceInPixels: 200,
            device: 0 // 0 for mouse pointer (computer), 1 for touch pointer (mobile)
        });

        var gui = new dat.GUI();
        gui.add(this.joystick, 'singleDirection');
        gui.add(this.joystick, 'maxDistanceInPixels');
        gui.add(this.joystick, 'device', { Computer: 0, Mobile: 1 });
    },

    update: function ()
    {
        var speed = 0.2;
        this.sprite.body.velocity.set(this.joystick.deltaX * speed, this.joystick.deltaY * speed);
    }
});

myGame.scenes.push(gamePlayState);
