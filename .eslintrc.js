module.exports = {
    extends: [
        'eslint:recommended',
        'next/core-web-vitals',
        'plugin:react/jsx-runtime',

        // "plugin:@typescript-eslint/recommended",
        'plugin:@typescript-eslint/strict',
        'plugin:@typescript-eslint/stylistic',

        'plugin:import/recommended',
        'plugin:import/typescript',

        'plugin:storybook/recommended',

        'prettier',
    ],
    plugins: ['@typescript-eslint', 'import', 'unused-imports'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    // root: true,

    ignorePatterns: [
        'dist',
        '.eslintrc.js',
        '.prettierrc.js',
        'kubernetes-manifests',
        '.github',
        'next.config.mjs',
    ],

    rules: {
        // default
        indent: 'off',
        quotes: 'off',
        semi: 'off',
        'linebreak-style': 'off',

        // import
        'import/default': 'warn',
        'import/no-cycle': 'warn',
        'import/no-duplicates': 'warn',
        'import/no-named-as-default': 'off',
        'import/no-self-import': 'warn',
        'import/no-unassigned-import': 'off',
        'import/no-unresolved': 'error',
        'import/no-useless-path-segments': 'warn',
        'import/namespace': [
            'error',
            {
                allowComputed: true,
            },
        ],

        // typescript
        '@typescript-eslint/consistent-type-exports': 'warn',
        '@typescript-eslint/consistent-type-imports': [
            'warn',
            {
                fixStyle: 'inline-type-imports',
            },
        ],

        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksVoidReturn: {
                    arguments: false,
                    attributes: false,
                },
            },
        ],
        '@typescript-eslint/consistent-type-definitions': 'off',
        // '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
        '@typescript-eslint/sort-type-constituents': 'warn',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/restrict-template-expressions': [
            'error',
            {
                allowNumber: true,
            },
        ],
        // '@typescript-eslint/array-type': [
        //     'error',
        //     {
        //         default: 'generic',
        //     },
        // ],
        '@typescript-eslint/no-explicit-any': [
            'warn',
            {
                ignoreRestArgs: true,
            },
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: ['typeAlias', 'interface', 'class'],
                format: ['PascalCase'],
            },
        ],

        /* unused imports */
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
    },

    settings: {
        react: {
            version: 'detect',
        },

        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },

        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
};
