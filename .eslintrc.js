module.exports = {
  // https://eslint.org/docs/user-guide/configuring#specifying-parser-options
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      // Supports JSX syntax (not the same as supporting React).
      jsx: true,
    },
  },

  // commonly used envs
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },

  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['**/tsconfig.json'],
      },
      extends: [
        'plugin:import/typescript',
        // https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-extra-semi': 'off',
      },
    },
  ],

  // we use recommended configurations
  extends: [
    // https://eslint.org/docs/rules/
    'eslint:recommended',
    // https://github.com/yannickcr/eslint-plugin-react
    'plugin:react/recommended',
    // https://www.npmjs.com/package/eslint-plugin-react-hooks
    'plugin:react-hooks/recommended',
    // https://github.com/benmosher/eslint-plugin-import
    'plugin:import/recommended',
    // https://github.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended',
    // https://github.com/prettier/eslint-config-prettier
    'prettier',
  ],

  plugins: ['react-hooks', '@typescript-eslint'],

  rules: {
    'prettier/prettier': ['error', require('./.prettierrc')],

    // disable nice-to-have rules for migrate convenience
    'react/prop-types': 'off',
    'react/no-find-dom-node': 'off',
    'react/display-name': 'off',

    // recommended rules
    'prefer-const': 'error',
    'no-var': 'error',

    // hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },

  settings: {
    // https://github.com/yannickcr/eslint-plugin-react#configuration
    react: {
      version: '16',
    },
  },
}
