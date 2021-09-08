const OFF = 0
const ERROR = 2

module.exports = {
  // parse proposal features like class fileds
  parser: '@typescript-eslint/parser',

  // https://eslint.org/docs/user-guide/configuring#specifying-parser-options
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      // Supports JSX syntax (not the same as supporting React).
      jsx: true,
    },
    project: [
      './tsconfig.eslint.json',
      './example/tsconfig.json',
      './packages/*/tsconfig.json',
    ],
  },

  // commonly used envs
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },

  // we use recommended configurations
  extends: [
    // https://eslint.org/docs/rules/
    'eslint:recommended',
    // https://github.com/yannickcr/eslint-plugin-react
    'plugin:react/recommended',
    // https://github.com/benmosher/eslint-plugin-import
    'plugin:import/recommended',
    // https://github.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended',
    // https://www.npmjs.com/package/eslint-plugin-react-hooks
    'plugin:react-hooks/recommended',
    // https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],

  plugins: ['react-hooks', '@typescript-eslint'],

  rules: {
    'prettier/prettier': ['error', require('./.prettierrc')],

    // disable nice-to-have rules for migrate convenience
    'react/prop-types': OFF,
    'react/no-find-dom-node': OFF,
    'react/display-name': OFF,

    // recommended rules
    'prefer-const': ERROR,
    'no-var': ERROR,

    // hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',

    // TS
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
  },

  settings: {
    // https://github.com/yannickcr/eslint-plugin-react#configuration
    react: {
      version: '16',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/core-modules': [
      'griffith',
      'griffith-mp4',
      'griffith-utils',
      'griffith-message',
    ],
  },
}
