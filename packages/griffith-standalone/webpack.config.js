module.exports = {
  mode: 'production',

  output: {
    filename: 'index.umd.min.js',
    library: 'Griffith',
  },

  devtool: 'sourcemap',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
}
