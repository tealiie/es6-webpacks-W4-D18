/* global __dirname */

var path = require('path')

var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var jsDir = path.join(__dirname, 'js')
var htmlDir = path.join(__dirname, 'html')
var viewsDir = path.join(__dirname, 'views')
var buildDir = path.join(__dirname, 'build')

module.exports = {
  entry: path.join(jsDir, 'index.js'),
  output: {
    path: buildDir,
    filename: 'bundle.js'
  },
  devServer: { contentBase: buildDir  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      test: jsDir
    }, {
      loader: 'handlebars-loader',
      test: viewsDir
    }]
  },
  plugins: [
    // Simply copies the files over
    new CopyWebpackPlugin([
      { from: htmlDir   } // to: output.path
    ]),
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin()
  ],
  stats: {
    colors: true // Nice colored output
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map'
}
