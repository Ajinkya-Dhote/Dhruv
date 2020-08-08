const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js'
  },
  target: 'node',
  plugins : [
      new webpack.DefinePlugin("./config/env.js"),
      // new webpack.IgnorePlugin(/^pg-native$/)
  ],
  externals: [nodeExternals()]

};