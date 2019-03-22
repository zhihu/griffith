module.exports = api => {
  const config =
    api.env() === 'cjs'
      ? {plugins: ['@babel/plugin-transform-modules-commonjs']}
      : {presets: ['@zhihu/babel-preset/library']}
  return {
    babelrcRoots: ['.', './packages/*'],
    ...config,
  }
}
