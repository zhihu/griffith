module.exports = {
  mode: 'production',

  output: {
    filename: 'index.umd.min.js',
    library: 'Griffith',
  },

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
