// memorize-path <https://github.com/jonschlinkert/memoize-path>
// Copyright (c) 2016, Jon Schlinkert (MIT)
'use strict'

// Easily create reusable, stackable file paths from memoized path segments.

const path = require('path')

function create (dir) {
  dir = dir || process.cwd()

  return (function (cwd) {
    var curr

    function memo (str) {
      if (typeof str === 'string') {
        var dir = path.resolve(cwd, str)
        var fn = create(dir)
        fn.parent = cwd
        fn.path = dir
        return fn
      }

      return path.resolve(cwd)
    }

    Object.defineProperty(memo, 'path', {
      configurable: true,
      enumerable: true,
      set: function (val) {
        curr = val
      },
      get: function () {
        return path.resolve(curr || cwd)
      }
    })
    return memo
  }(dir))
}

module.exports = create
