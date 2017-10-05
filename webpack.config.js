const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loaders: ['file-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [{
        module: 'reveal.js',
        entry: ['lib/js/head.min.js', 'js/reveal.js', 'css/reveal.css'],
      }],
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/content',
        to: 'content',
      },
    ]),
  ],
  devServer: {
    noInfo: true,
    port: 8081
  }
};