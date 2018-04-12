var path = require('path')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  externals: {
    lodash: '_',
    d3: 'd3'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // plugins: [new UglifyJSPlugin()],
  output: {
    filename: 'dagre-d3.js',
    library: 'dagreD3',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist')
  }
}
