/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    // All imported modules in your tests should be mocked automatically
    automock: false,

    // Automatically clear mock calls, instances and results before every test
    clearMocks: true,

    // A map from regular expressions to module names that allow to stub out resources with a single module
    moduleNameMapper: {
        '^phaser$': '<rootDir>/node_modules/' + process.env.PHASER_VERSION === '3.24.1' ? 'phaser3.24' : 'phaser3.55' + '/src/phaser.js'
    },

    // The root directory that Jest should scan for tests and modules within
    rootDir: './',

    // A list of paths to directories that Jest should use to search for files in
    roots: [
        '<rootDir>/src/tests'
    ],

    // The paths to modules that run some code to configure or set up the testing environment before each test
    setupFiles: [
        'jest-canvas-mock'
    ],

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    // Indicates whether each individual test should be reported during the run
    verbose: true
};
