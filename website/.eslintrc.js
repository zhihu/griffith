module.exports = {
  // gatsby 的 ESLint 与 root 冲突了，会导致 `eslint-config-react-app` 查找不到，禁止它
  extends: [require.resolve('../.eslintrc.js')],
}
