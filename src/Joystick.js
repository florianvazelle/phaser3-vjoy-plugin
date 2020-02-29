export default class Joystick {

    constructor(scene, settings) {
        this.scene = scene;

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
            singleDirection: (settings.singleDirection === undefined || settings.singleDirection === null) ? true : settings.singleDirection,
            maxDistanceInPixels: (settings.maxDistanceInPixels === undefined || settings.maxDistanceInPixels === null) ? 200 : settings.maxDistanceInPixels,
            device: (settings.device === undefined || settings.device === null) ? 0 : settings.device
        };

        console.log(settings, this.settings)

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
    create({ position }) {
        if (!this.active) {
            this.active = true;

            this.imageGroup.forEach(sprite => {
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
    getCursors() {
        return this.cursors;
    }
    
    /**
     * To define cursors
     * @method setDirection
     * @param {Array} - Coordinates of pointer (A Pointer object encapsulates both mouse and touch input within Phaser.)
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
        
        this.imageGroup.forEach(function (sprite, index) {
            sprite.x = this.initialPoint.x + (deltaX) * index / 3;
            sprite.y = this.initialPoint.y + (deltaY) * index / 3;
        }, this);
    }
    
    update () {
        var pointers = this.scene.input.manager.pointers;
        this.setDirection(pointers);
    }

    /**
     * For remove the Joystick
     * @method remove
     */
    remove() {
        if (this.active) {
            this.active = false;

            this.imageGroup.forEach(sprite => {
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
}