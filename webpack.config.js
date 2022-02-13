var TerserPlugin = require('terser-webpack-plugin');

module.exports = function(env, argv) {
    var mode = argv.mode || 'development';
    var isProd = mode === 'production';

    return {
        mode: isProd ? 'production' : 'development',
        context: `${__dirname}/src/`,
        entry: {
            VJoyPlugin: './VJoyPlugin.js'
        },
        output: {
            path: isProd ? `${__dirname}/dist/` : `${__dirname}/demo/`,
            filename: '[name].js',
            library: {
                name: 'VJoyPlugin',
                type: 'umd'
            }
        },
        externals: {
            phaser: {
                root: 'Phaser',
                commonjs: 'phaser',
                commonjs2: 'phaser',
                amd: 'phaser'
            }
        },
        ...(isProd && {
            optimization: {
                minimize: true,
                minimizer: [
                    new TerserPlugin({
                        extractComments: false,
                        terserOptions: {
                            compress: {
                                drop_console: true
                            }
                        }
                    })
                ]
            }
        }),
        ...(!isProd && {
            devtool: 'source-map'
        })
    };
};
