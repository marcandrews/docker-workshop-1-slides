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
    path: path.join(__dirname, 'docs'),
    filename: '[name].[hash].js'
  },
  resolve: {
    modules: ['./node_modules']
  },
  module: {
    loaders: [
      {
        test: /reveal\.js\/plugin\/.*\.js$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /reveal\.js\/plugin\/.*\.html$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
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