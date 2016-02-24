 // const path = require('path');
const webpack = require("webpack");

 module.exports = {
  context: __dirname + "/src",
  entry: './js/main.js',
  output: {
    path: __dirname + "/build/js",
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  devtool: "#source-map"
};