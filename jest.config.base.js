const path = require("path");

module.exports = {
    roots: ["<rootDir>"],
    testRegex: "/test/.*\\.test\\.(ts?|tsx?)?$",
    setupFiles: [path.join(__dirname, "/jest.setup.js")],
    collectCoverage: true,
    collectCoverageFrom: ["**/src/**/*.{ts,tsx}", "!**/*.d.ts", "!<rootDir>/lib/"],
    coveragePathIgnorePatterns: ["(test/.*.mock).(|ts?|tsx?)$"],
    globals: {
        "process.env.__DEV__": true,
        "process.env.__PROD__": false,
        "process.env.__BROWSER__": false,
        "process.env.__SERVER__": false
    }
};
