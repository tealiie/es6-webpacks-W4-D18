module.exports = {
  entry: './js/index.js',
  output: 'bundle.js',
  module: {
    loaders: [
      { loader: 'babel-loader', test: /\.js$/, exclude: 'node_modules' },
      { loader: 'handlebars-loader', test: /\.hbs$/ }
    ]
  },
  devtool: 'source-map'
}
