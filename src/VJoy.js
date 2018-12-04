class VJoy extends Phaser.Plugins.BasePlugin {

  constructor(pluginManager) {
    super('VJoy', pluginManager);

    this.cursors = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    this.initialPoint = {
      x: 0,
      y: 0
    };

    this.settings = {
      singleDirection: true,
      maxDistanceInPixels: 200,
      device: 0
    };

    this.imageGroup = [];

    this.active = false;
  }

  /**
   * First function call
   * @method init
   */
  init() {
    console.log('Plugin is alive');
  }

  /**
   * To get the cursors attribute
   * @method getCursors
   * @return {Object}
   */
  getCursors() {
    return this.cursors;
  }

  /**
   * For set sprite
   * @method setSprite
   * @param {array} - Array of multiple sprite
   */
  setSprite(imageGroup) {
    this.imageGroup = imageGroup;
    this.removeJoystick();
  }

  /**
   * To define cursors
   * @method setDirection
   * @param {array} - Coordinates of pointer (A Pointer object encapsulates both mouse and touch input within Phaser.)
   */
  setDirection(pointers) {
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
      up: (deltaY < 0),
      down: (deltaY > 0),
      left: (deltaX < 0),
      right: (deltaX > 0)
    }

    this.imageGroup.forEach(function(sprite, index) {
      sprite.x = this.initialPoint.x + (deltaX) * index / 3;
      sprite.y = this.initialPoint.y + (deltaY) * index / 3;
    }, this);
  }

  /**
   * For create the Joystick
   * @method createJoystick
   * @param {array} - Coordinates of pointer.
   */
  createJoystick(pointers) {
    var pointer = pointers[device].position;
    this.active = true;

    this.imageGroup.forEach((sprite) => {
      sprite.visible = true;
      sprite.setScrollFactor(0);

      sprite.x = pointer.x;
      sprite.y = pointer.y;

    });

    this.initialPoint = {
      x: pointer.x,
      y: pointer.y
    };
  }

  /**
   * For remove the Joystick
   * @method removeJoystick
   */
  removeJoystick() {
    this.active = false;

    this.imageGroup.forEach((sprite) => {
      sprite.visible = false;
    });

    this.cursors = {
      up: false,
      down: false,
      left: false,
      right: false
    };
  }
}