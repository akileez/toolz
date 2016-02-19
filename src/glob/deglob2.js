'use strict'

var glob = require('glob')
var path = require('path')
var reduce = require('../async/itera-reduce')
var unique = require('../array/unique')
var extend = require('../object/xtend')

exports = module.exports = globToFiles
exports.sync = globToFilesSync

function globToFiles (globs, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  options = defaults(options)

  reduce(globs, [], expand, done)

  function expand (accumulator, globPath, key, next) {
    glob(globPath, options, function (err, files) {
      if (err) return next(err)
      accumulator.push.apply(accumulator, files.map(function (file) {
        return path.resolve(options.cwd, file)
      }))
      next(null, accumulator)
    })
  }

  function done (err, files) {
    if (err) return callback(err)
    callback(null, unique(files))
  }
}

function globToFilesSync (globs, options) {
  options = defaults(options || {})

  return globs.reduce(function (files, globPath) {
    files.push.apply(files, glob.sync(globPath, options))
    return unique(files.map(function (file) {
      return path.resolve(options.cwd, file)
    }))
  }, [])
}

function defaults (options) {
  return extend({cwd: process.cwd()}, options)
}