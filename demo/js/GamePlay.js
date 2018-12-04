var gamePlayState = new Phaser.Class({
  // Define scene
  Extends: Phaser.Scene,
  initialize: function GamePlay() {
    Phaser.Scene.call(this, {
      key: 'GamePlay'
    });
  },

  preload: function() {
    this.load.image('player', 'assets/player.png');
    this.load.image('vjoy_base', 'assets/base.png');
    this.load.image('vjoy_body', 'assets/body.png');
    this.load.image('vjoy_cap', 'assets/cap.png');
  },

  create: function() {
    sprite = this.add.sprite(300, 300, 'player');
    plugin = this.plugins.get('VJoy');

    var imageGroup = [];
    imageGroup.push(this.add.sprite(0, 0, 'vjoy_cap'));
    imageGroup.push(this.add.sprite(0, 0, 'vjoy_body'));
    imageGroup.push(this.add.sprite(0, 0, 'vjoy_body'));
    imageGroup.push(this.add.sprite(0, 0, 'vjoy_base'));

    //To customize the plugin, we change the options
    plugin.settings.singleDirection = false;
    plugin.settings.device = 1; //0 for mouse pointer (computer), 1 for touch pointer (mobile)
    plugin.setSprite(imageGroup);

    this.input.on('pointerdown', function(pointer) {
      if (!plugin.active) {
        plugin.createJoystick(pointer.position);
      }
    }, this);
    this.input.on('pointerup', function(pointer) {
      if (plugin.active) {
        plugin.removeJoystick();
      }
    }, this);
  },

  update: function() {
    var pointers = this.input.manager.pointers;
    plugin.setDirection(pointers);
    var cursors = plugin.getCursors();

    if (cursors.left) {
      sprite.x--;
    } else if (cursors.right) {
      sprite.x++;
    }
    if (cursors.up) {
      sprite.y--;
    } else if (cursors.down) {
      sprite.y++;
    }
  },
});

myGame.scenes.push(gamePlayState);