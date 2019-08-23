module.exports = function ({ config }) {
    config.module.rules.push({
        test: /(\/|\\)stories(\/|\\).*\.tsx$/,
        loaders: [{
            loader: require.resolve('@storybook/addon-storysource/loader'),
            options: {
                parser: 'typescript',
                prettierConfig: {
                    printWidth: 120,
                    singleQuote: false,
                },
            }
        }],
        enforce: 'pre',
    });

    return config;
};
