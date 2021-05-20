module.exports = {
  babelrcRoots: ['.', './packages/*'],
  presets: [
    ['@babel/preset-env', {targets: {node: '8.10'}}],
    ['@babel/preset-react', {useBuiltIns: true}],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
}
