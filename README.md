# Transpiling and bundling ES6 using webpack

This is a small tutorial on how to use webpack to transpile and bundle ES6 code for use in the browser. Thanks to [Alex Rauschmayer](http://rauschma.de) for his [webpack-babel-demo](https://github.com/rauschma/webpack-babel-demo) repo.


## Steps

First, let's install the packages we're going to need:

* `npm init` (defaults are fine)
* `npm i webpack webpack-dev-server --save-dev`
* `npm i babel-loader babel-preset-es2015 --save-dev`
* `npm i superagent handlebars handlebars-loader --save-dev`

We need to tell Babel how to transpile our ES6 to ES5. We could do that in a few different places, but `package.json` works nicely:

```json
"babel": {
  "presets": ["es2015"]
}
```

This tells Babel to use a set of rules that comply with the ES2015 standard (which is the same as ES6). While you're in `package.json`, add a script for webpack-dev-server:

```json
"scripts": {
  "start": "webpack-dev-server --hot --inline"
}
```

`--hot --inline` sets up hot module replacement, which will reload the page in your browser when you make changes.

Now we need a `webpack.config.js`:

```js
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
```

Create a very simple `index.html`:

```html
<!DOCTYPE html>
<head>
  <title>ES6 FTW!</title>
</head>
<body>
  <div id="placeholder">Loading image data ...</div>

  <script src="bundle.js"></script>
</body>
</html>
```

Now create `js/index.js`.

  ```js
  import request from 'superagent'
  import imageTemplate from '../views/image.hbs'

  const showImage = (err, res) => {
    const placeholder = document.getElementById('placeholder')
    placeholder.innerHTML = imageTemplate(res.body)
  }

  const getImage = () => {
    showImage(null, { 
      body: { 
        title: 'DEMO', 
        explanation: 'DEMO' 
      } 
    })
  }

  document.addEventListener('DOMContentLoaded', getImage)
  ```

Create `views/image.hbs`:

```xml
<div id="apod">
  <p><b>{{title}}</b></p>
  <p>{{explanation}}</p>
  <img src="{{hdurl}}" alt="{{title}}">
</div>
```

Start the development server with `npm start` and navigate to http://localhost:8080. If all goes well, you should see a broken image and a few words.


## Next steps

Use Superagent to grab an image from the [NASA APOD API](https://api.nasa.gov/#live_example). Display it instead of the placeholder data we've provided above.


## Next next steps

Take it to the next level! How many different APIs can you make use of with Superagent and Handlebars? Remember to use ES6 (no `var`! Get that `var` outta here!)


## A more complex example

Here's a `webpack.config.js` that uses the copy-webpack-plugin to move files around during the build. This would enable you to maintain a separate `build` directory:

```js
`/* global __dirname */

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
  // Create Sourcemaps for the bundle
  devtool: 'source-map'
}
```


## Add a linter

Try this one:

```shell
npm install -g eslint
eslint --init
```

When it asks you, choose "Use a popular style guide" and "Standard", JSON format. Check out [Standard JS](https://standardjs.com) for more details. It'll install some packages. Take a look at your new `.eslintrc` file. Has there been an effect on your editor? Is it set up to use eslint output?
