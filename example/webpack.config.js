const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  const isProduction = env === 'production'

  return {
    mode: isProduction ? 'production' : 'development',

    entry: {
      main: './main/index.js',
      iframe: './iframe/index.js',
      inline: './inline/index.js',
      fmp4: './fmp4/index.js',
      hls: './hls/index.js',
      mp4: './mp4/index.js',
    },

    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
      mainFields: ['source', 'browser', 'module', 'main'],
    },

    devServer: {
      disableHostCheck: true,
      port: 8000,
      proxy: {
        '/mp4': {
          target: 'https://zhstatic.zhihu.com/cfe/griffith/',
          pathRewrite: {'^/mp4': ''},
          changeOrigin: true,
          secure: false,
        },
        '/vzuu': {
          target: 'https://vdn1.vzuu.com/',
          pathRewrite: {'^/vzuu': ''},
          changeOrigin: true,
          secure: false,
        },
      },
    },

    devtool: 'cheap-module-eval-source-map',

    module: {
      rules: [
        {
          test: /\.js$/,
          oneOf: [
            {
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                  '@babel/plugin-proposal-class-properties',
                  'react-hot-loader/babel',
                ],
              },
            },
          ],
        },
      ],
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
          },
          common: {
            chunks: 'initial',
            name: 'common',
            test: /packages\/griffith/,
          },
        },
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './main/index.html',
        chunks: ['main', 'common', 'vendor'],
      }),
      new HtmlWebpackPlugin({
        template: './iframe/index.html',
        filename: 'iframe.html',
        chunks: ['iframe', 'common', 'vendor'],
      }),
      new HtmlWebpackPlugin({
        template: './inline/index.html',
        filename: 'inline.html',
        chunks: ['inline', 'common', 'vendor'],
      }),
      new HtmlWebpackPlugin({
        template: './fmp4/index.html',
        filename: 'fmp4.html',
        chunks: ['fmp4', 'common', 'vendor'],
      }),
      new HtmlWebpackPlugin({
        template: './hls/index.html',
        filename: 'hls.html',
        chunks: ['hls', 'common', 'vendor'],
      }),
      new HtmlWebpackPlugin({
        template: './mp4/index.html',
        filename: 'mp4.html',
        chunks: ['mp4', 'common', 'vendor'],
      }),
    ],
  }
}
