// memoize-path <https://github.com/jonschlinkert/memoize-path>
// Copyright (c) 2016, Jon Schlinkert (MIT)
'use strict'

// Easily create reusable, stackable file paths from memoized path segments.

var resolve = require('path').resolve

function create (dir) {
  dir = dir || process.cwd()

  return (function (cwd) {
    var curr

    function memo (str) {
      if (typeof str === 'string') {
        var dir = resolve(cwd, str)
        var fn = create(dir)
        fn.parent = cwd
        fn.path = dir
        return fn
      }

      return resolve(cwd)
    }

    return memo
  }(dir))
}

module.exports = create
