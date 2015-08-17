// adopted from: https://github.com/fshost/node-dir
// Copyright (c) 2012 Nathan Cartwright <fshost@yahoo.com> (MIT)

var fs = require('fs')
var path = require('path')

/**
 * merge two objects by extending target object with source object
 * @param target object to merge
 * @param source object to merge
 * @param {Boolean} [modify] whether to modify the target
 * @returns {Object} extended object
 */

function extend (target, source, modify) {
  var result = target
    ? modify
      ? target
      : extend({}, target, true)
    : {}

  if (!source) return result
  for (var key in source) {
    if (source.hasOwnProperty(key) && source[key] !== undefined) {
      result[key] = source[key]
    }
  }
  return result
}

/**
 * determine if a string is contained within an array or matches a regular expression
 * @param   {String} str string to match
 * @param   {Array|Regex} match array or regular expression to match against
 * @returns {Boolean} whether there is a match
 */

function matches (str, match) {
  if (Array.isArray(match)) return match.indexOf(str) > -1
  return match.test(str)
}

/**
 * read files and call a function with the contents of each file
 * @param  {String} dir path of dir containing the files to be read
 * @param  {String} encoding file encoding (default is 'utf8')
 * @param  {Object} options options hash for encoding, recursive, and match/exclude
 * @param  {Function(error, string)} callback  callback for each files content
 * @param  {Function(error)}   complete  fn to call when finished
 */

function readDir (dir, opts, cb, complete) {
  if (typeof opts === 'function') {
    complete = cb
    cb = opts
    opts = {}
  }

  if (typeof opts === 'string') opts = {
    encoding: opts
  }

  opts = extend({
    recursive: true,
    encoding: 'utf8',
  }, opts)

  var files = []
  var done = function (err) {
    if (typeof complete === 'function') {
      if (err) return complete(err)
      complete(null, files)
    }
  }

  fs.readdir(dir, function (err, list) {
    if (err) {
      if (err.code === 'EACCES') return done()
      return done(err)
    }

    var i = 0

    if (opts.reverse === true || (typeof opts.sort == 'string' && (/reverse|desc/i).test(opts.sort))) {
      list = list.reverse()
    } else if (opts.sort !== false) list = list.sort()

    ;(function next() {
      var filename = list[i++]
      if (!filename) return done(null, files)

      var file = path.join(dir, filename)

      fs.stat(file, function (err, stat) {
        if (err) return done(err)
        if (stat && stat.isDirectory()) {
          if (opts.recursive) {
            if (opts.matchDir && !matches(filename, opts.matchDir)) return next()
            if (opts.excludeDir && matches(filename, opts.excludeDir)) return next()

            readDir(file, opts, cb, function (err, sfiles) {
              if (err) return done(err)
              files = files.concat(sfiles)
              next()
            })
          } else next()
        } else if (stat && stat.isFile()) {
          if (opts.match && !matches(filename, opts.match)) return next()
          if (opts.exclude && matches(filename, opts.exclude)) return next()
          if (opts.filter && !opts.filter(filename)) return next()
          if (opts.shortName) files.push(filename)
          else files.push(file)

          fs.readFile(file, opts.encoding, function (err, data) {
            if (err) {
              if (err.code === 'EACCES') return next()
              return done(err)
            }

            if (cb.length > 3) {
              if (opts.shortName) cb(null, data, filename, next)
              else cb(null, data, file, next)
            } else {
              cb(null, data, next)
            }
          })
        } else {
          next()
        }
      })
    })()
  })
}

module.exports = readDir
