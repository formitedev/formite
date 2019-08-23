module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    "plugins": [
        "react-hooks"
    ],
    // Javascript configuration
    extends: [
        'plugin:prettier/recommended',  // Displays prettier errors as ESLint errors. Should be the last configuration in the extends array.
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    "rules": {
        "react-hooks/rules-of-hooks": "error",  // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn"   // Checks effect dependencies
    },
    "overrides": [
        {
            // Typescript configuration
            "files": ["*.ts", "*.tsx"],
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:react/recommended',
                'prettier/@typescript-eslint',  // Disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
                'plugin:prettier/recommended',  // Displays prettier errors as ESLint errors. Should be the last configuration in the extends array.
            ],
            rules: {
                "@typescript-eslint/explicit-function-return-type": "off",
                "@typescript-eslint/no-parameter-properties": ["error", { "allows": ["public readonly"] }],
                "@typescript-eslint/no-use-before-define": ["error", {
                    "functions": false,
                    "classes": true,
                    variables: true
                }],
                "@typescript-eslint/prefer-interface": "off",
                // Disable the base rule as it can report incorrect errors
                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": ["error", {
                    "vars": "all",
                    "argsIgnorePattern": "^_",
                    "ignoreRestSiblings": true
                }]
            }
        }
    ]
};
