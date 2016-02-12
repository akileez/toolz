// https://github.com/alessioalex/debug-app
// MIT

"use strict";

/*
debug with a default namespace consisting of the <application name>:<current filename>.

Instead of doing:

  var debug = require('debug')('myApp:file');

..use debug-app instead:

  var debug = require('debug-app')();

The result is identical, but you won't have to type the app name and the filename over and over again. This is also future-proof in case your app name / filename change.

*/

var debug = require('./');
var stack = require('./callsite');
var path = require('path');

function debugApp() {
  var appPath = path.resolve(__dirname + '/../../')
  var appName = require(appPath + '/package.json').name

  return debug(appName + ':' + stack()[1].getFileName().replace(appPath, ''))
}

module.exports = debugApp
