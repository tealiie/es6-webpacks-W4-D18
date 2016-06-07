# Transpiling and bundling ES6 using webpack

This is a small tutorial on how to use webpack to transpile and bundle ES6 code for use in the browser. Thanks to [Alex Rauschmayer](http://rauschma.de) for his [webpack-babel-demo](https://github.com/rauschma/webpack-babel-demo) repo.

## Steps

* `npm init` (defaults are fine)
* `npm i webpack webpack-dev-server copy-webpack-plugin --save-dev`
* `npm i babel-loader babel-preset-es2015 babel-polyfill --save-dev`
* `npm i superagent handlebars handlebars-loader --save-dev`
* Create some scripts and configure Babel in `package.json`:

  ```js
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch",
    "start": "webpack-dev-server --hot --inline"
  },
  "babel": {
    "presets": ["es2015"]
  }
  ```

* Create `webpack.config.js`:

  ```js
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
    devServer: { contentBase: buildDir },
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
        { from: htmlDir  } // to: output.path
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
  ```

* Create some folders with `mkdir html js views`.

* Create `html/index.html`:

  ```xml
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>ES6 FTW!</title>
  </head>
  <body>
    <div id="placeholder">Loading image data ...</div>

    <script src="bundle.js"></script>
  </body>
  </html>
  ```

* Create `js/index.js`:

  ```js
  import request from 'superagent'
  import imageTemplate from '../views/image.hbs'

  const showImage = (err, res) => {
    const placeholder = document.getElementsById('placeholder')
    placeholder.innerHTML = imageTemplate(res.body)
  }

  const getImage = () => {
    const apod = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
    request.get(apodEndpoint).end(showImage)
  }

  document.addEventListener('DOMContentLoaded', getImage)
  ```

* Create `views/image.hbs`:

  ```xml
  <div id="apod">
    <p><b>{{title}}</b></p>
    <p>{{explanation}}</p>
    <img src="{{hdurl}}" alt="{{title}}">
  </div>
  ```

* Build the assets using `npm run build`.

* Start the development server with `npm start` and navigate to http://localhost:8080. Tip: make a change and keep an eye on your browser.

That's it. I hope this was helpful.
