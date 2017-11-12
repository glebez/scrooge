const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
  new CleanWebpackPlugin(['dist']),
  new HtmlWebpackPlugin({
    template: './client/src/index.html',
  }),
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
      name: '[name].[ext]'
    }
  }
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new UglifyJSPlugin());
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
        name: '[name].[ext]'
      }
    }
  ];
}

module.exports = {
  entry: './client/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/',
  },
  plugins,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules,
  },
  resolve: { extensions: ['.js', '.jsx'] }
};
