const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const plugins = [
  new CleanWebpackPlugin(['dist']),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
];

let rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: ['babel-loader', 'eslint-loader']
  },
  {
    test: /\.(png|svg|jpg|gif|ico)$/,
    loader: 'file-loader',
    options: {
      emitFile: false,
      publicPath: '/static/',
      name: '[name].[ext]'
    }
  }
];

if (process.env.NODE_ENV === 'production') {
  rules = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.(png|svg|jpg|gif|ico)$/,
      loader: 'file-loader',
      options: {
        emitFile: false,
        publicPath: '/static/',
        name: '[name].[ext]'
      }
    }
  ]
}

module.exports = {
  target: 'node',
  entry: ['babel-polyfill', './server/src/start.js'],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins,
  devtool: 'inline-source-map',
  module: {
    rules,
  },
  resolve: { extensions: ['.js', '.jsx'] }
};
