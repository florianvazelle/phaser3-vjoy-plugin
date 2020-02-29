import Joystick from './Joystick';

export default class VJoyPlugin extends Phaser.Plugins.ScenePlugin {

    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.joysticks = [];

        // Register our new Game Object type
        pluginManager.registerGameObject('joystick', this.addJoystick.bind(this), config => {
            return this.add(
                config.settings,
                config.joystickClass
                );
            });
    }

    addJoystick(settings, joystickClass) {
        if (!joystickClass) {
            joystickClass = Joystick;
        }

        const joystick = new joystickClass(this.scene, settings);

        this.joysticks.push(joystick)

        return joystick;
    }

    /**
     * If this is a Scene Plugin (i.e. installed into a Scene) then this method is called when the Scene boots.
     * By this point the plugin properties `scene` and `systems` will have already been set.
     * In here you can listen for Scene events and set-up whatever you need for this plugin to run.
     * @returns {void}
     */
    boot() {
        const eventEmitter = this.systems.events;

        eventEmitter.on('update', this.update, this);
        eventEmitter.on('destroy', this.destroy, this);
    }

    /**
     * Internal update method, called by the PluginManager.
     *
     * @protected
     * @returns {void}
     */
    update() {
        this.joysticks.forEach(joystick => {
            joystick.update();
        });
    }

    /**
     * Destroys this Weapon.
     * You must release everything in here, all references, all objects, free it all up.
     * @returns {void}
     */
    destroy() {
        this.pluginManager = null;
        this.game = null;
        this.scene = null;
        this.systems = null;
    }
}