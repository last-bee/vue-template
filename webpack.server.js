const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const cssnano = require('cssnano')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  target: 'node',
  entry: {
    'main': './src/server-entry.js'
  },
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, './server-build'),
    filename: '[name].js'
  },
  externals: Object.keys(require('./package.json').dependencies),
  mode: 'production',
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader'
      },
      {
        test: /.jsx$/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['>1%', 'last 2 version', 'ios 7']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['>1%', 'last 2 version', 'ios 7']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              name: '[name]_[hash:8].[ext]',
              limit: 10240
            }
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    }),
    new miniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new optimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: cssnano
    }),
    new CleanWebpackPlugin(),
    new VueServerPlugin()
  ],
}