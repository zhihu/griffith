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

    devServer: {
      disableHostCheck: true,
      port: 8000,
      proxy: {
        '/mp4': {
          target: 'https://zhstatic.zhihu.com/cfe/griffith/',
          pathRewrite: {'^/mp4' : ''},
          changeOrigin: true,
          secure: false,
        },
      }
    },

    devtool: 'cheap-module-eval-source-map',

    resolve: {
      alias: {
        griffith: 'griffith/src',
        'griffith-mp4': 'griffith-mp4/src',
        'griffith-hls': 'griffith-hls/src',
      },
    },

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
