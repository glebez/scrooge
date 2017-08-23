const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './client/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './client/src/index.html'
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
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
          name: '[name].[ext]'
        }
      }
    ]
  },
  resolve: {extensions: ['.js', '.jsx']}
};
