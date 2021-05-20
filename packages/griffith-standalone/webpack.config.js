module.exports = {
  mode: 'production',

  output: {
    filename: 'index.umd.min.js',
    library: 'Griffith',
  },

  resolve: {
    alias: {
      // 'griffith-hls': 'griffith/null',
      // 'griffith-mp4': 'griffith/null',
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {loose: true}],
            [
              '@babel/preset-react',
              {
                useBuiltIns: true,
              },
            ],
          ],
        },
      },
    ],
  },
}
