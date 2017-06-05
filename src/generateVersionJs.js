'use strict'

var _ = require('lodash')
var fs = require('fs')
var pkg = readPackageJson()

fs.writeFileSync('./src/version.js', generateVersionJs(pkg))
/**
 * Read the contents of package.json in as JSON. Do not cache package.json,
 * because it may have changed (e.g. when running in watch mode).
 */
function readPackageJson () {
  var packageText = fs.readFileSync('./package.json')
  return JSON.parse(packageText)
}
function generateVersionJs (pkg) {
  return applyTemplate('./src/version.js.tmpl', { pkg: pkg })
}

function applyTemplate (templateFile, props) {
  var template = fs.readFileSync(templateFile)
  var compiled = _.template(template)
  return compiled(props)
}
