module.exports = {
  babelrcRoots: ['.', './packages/*'],
  presets: [
    ['@babel/preset-env', {targets: {node: '8.10'}}],
    ['@babel/preset-react'],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
}
