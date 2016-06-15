/*!
 * cwd <https://github.com/jonschlinkert/cwd>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var path = require('path')
// var findPkg = require('./find-pkg')
var findRoot = require('./find-root')

/**
 * Expose `cwd`
 */



/**
 * Cache filepaths to prevent hitting the file system
 * for multiple lookups for the exact same path.
 */

var cache = {}

/**
 * Uses [look-up] to resolve the absolute path to the root of a project.
 *
 * @param {String|Array} `filepath` The starting filepath. Can be a string, or path parts as a list of arguments or array.
 * @return {String} Resolve filepath.
 * @api public
 */

function cwd (filepath) {
  var fp = path.resolve(filepath || '')

  if (arguments.length > 1) {
    fp = path.resolve.apply(path, [].concat.apply([], arguments))
  }

  if (cache.hasOwnProperty(fp)) {
    return cache[fp]
  }

  try {
    // if (/package\.json$/.test(fp) && fs.accessSync(fp)) {
    //   return (cache[fp] = fp)
    // }

    // var filepath = findPkg.sync(fp)
    // var filepath = findRoot(fp)

    // var base = filepath ? path.dirname(filepath) : ''
    // console.log(base)
    // console.log(findRoot(fp), fp)

    return (cache[fp] = path.resolve(findRoot(fp), fp))
  } catch (err) {
    return (cache[fp] = fp)
  }
}

module.exports =  cwd
