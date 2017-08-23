const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  target: 'node',
  entry: './server/server.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  devtool: 'inline-source-map',
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
          emitFile: false,
          publicPath: '/static/',
          name: '[name].[ext]'
        }
      }
    ]
  },
  resolve: {extensions: ['.js', '.jsx']}
};
