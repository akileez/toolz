/*
  adopted from: cwd <https://github.com/jonschlinkert/cwd>
  Copyright (c) 2014-2015, Jon Schlinkert. (MIT)

  Cache filepaths to prevent hitting the file system
  for multiple lookups for the exact same path.

  resolves the absolute path to the root of a project.

  API:
    @filepath {String|Array} The starting filepath.
    Can be a string, or path parts as a list of arguments or array.

    @return {String} Resolve filepath
*/


var apply    = require('../function/apply')
var slice    = require('../array/slice')
var findRoot = require('./find-root')
var path     = require('path')

var cache = {}

function cwd (filepath) {
  var fp = arguments.length > 1
    ? apply(path.resolve, path, slice(arguments))
    : path.resolve(filepath || '')

  if (cache.hasOwnProperty(fp)) return cache[fp]

  return (cache[fp] = path.resolve(findRoot(fp), fp))
}

module.exports =  cwd
