module.exports = [
    {
        name: "@storybook/preset-typescript",
        options: {
            tsLoaderOptions: {
                configFile : "tsconfig.storybook.json"
            }
        }
    }
];