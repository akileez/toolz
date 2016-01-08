// adopted from: <https://github.com/jonschlinkert/is-valid-glob>
// Copyright (c) 2015, Jon Schlinkert and contributors (MIT)

'use strict'

// This just checks to make sure that a pattern is either a string or array,
// and if it's an array it's either empty or consists of only strings.

function isValidGlob (glob) {
  if (typeof glob === 'string' && glob.length > 0) return true
  if (Array.isArray(glob)) return glob.length !== 0 && every(glob)
  return false
}

function every (arr) {
  var len = arr.length

  while (len--) {
    if (typeof arr[len] !== 'string' || arr[len].length <= 0) return false
  }

  return true
}

module.exports = isValidGlob
