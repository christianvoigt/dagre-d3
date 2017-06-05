var path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  externals: {
    lodash: '_',
    d3: 'd3'
  },
  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    filename: 'dagre-d3.js',
    library: 'dagreD3',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist')
  }
}
