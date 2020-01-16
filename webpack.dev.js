const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname),
  }
});
