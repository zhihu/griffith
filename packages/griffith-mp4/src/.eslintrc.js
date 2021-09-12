module.exports = {
  extends: [require.resolve('../../../.eslintrc.js')],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/no-unsafe-call': 'warn',
      },
    },
  ],
}
