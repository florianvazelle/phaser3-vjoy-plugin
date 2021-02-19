[![Package version](https://img.shields.io/npm/v/phaser3-vjoy-plugin)](https://nodei.co/npm/phaser3-vjoy-plugin/)
![Total downloads](https://img.shields.io/npm/dt/phaser3-vjoy-plugin)
![License](https://img.shields.io/npm/l/phaser3-vjoy-plugin)

# Phaser 3 VJoy Plugin 

A simple plugin for Phaser 3 to allow you to use a joystick in your computer or mobile game.

## Getting Started

To install it with [npm](https://www.npmjs.com), run :

```
npm i phaser3-vjoy-plugin --save
```

## Usage

### Load the Plugin

As in the [phaser documentation](https://photonstorm.github.io/phaser3-docs/Phaser.Plugins.PluginManager.html#installScenePlugin__anchor), do something like this :

```javascript
import 'phaser';
import VJoyPlugin from 'phaser3-vjoy-plugin';

...

this.plugins.installScenePlugin('VJoyPlugin', VJoyPlugin, 'vjoy', this);

// and from within the scene :
this.sys.VJoyPlugin; // key value
this.vjoy; // mapping value
```

or, if you just use the dist file : 

```javascript
this.load.scenePlugin('VJoyPlugin', './VJoyPlugin.js', null, 'vjoy');
```

### Examples

To test the plugin, check the [online demo](https://florianvazelle.github.io/phaser3-vjoy-plugin/).

If you want to see the full implementation, you can find an example in the `demo` directory, you can run `npm run demo` to test it.

Or, if you want to use `import` statement, you can go to [phaser3-vjoy-plugin-demo](https://github.com/florianvazelle/phaser3-vjoy-plugin-demo).

## Development

Run `npm install` and then `npm run build` to build the plugin.

## References

- Based on [InformalPenguins/phaser-vjoy-plugin](https://github.com/InformalPenguins/phaser-vjoy-plugin)
- Using of [photonstorm/phaser3-plugin-template](https://github.com/photonstorm/phaser3-plugin-template)