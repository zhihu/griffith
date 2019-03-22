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
        oneOf: [
          {
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: ['@zhihu/babel-preset/app'],
              cacheDirectory: true,
            },
          },
          {
            exclude: /@babel\/runtime/,
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              configFile: false,
              presets: ['@zhihu/babel-preset/dependencies'],
              compact: false,
            },
          },
        ],
      },
    ],
  },
}
