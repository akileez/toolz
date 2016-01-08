// repeat-string <https://github.com/jonschlinkert/repeat-string>
// Copyright (c) 2014-2015, Jon Schlinkert.

'use strict'

var res = ''
var cache

/**

Repeat the given `string` the specified `number` of times.

var repeat = require('repeat-string')
repeat('A', 5)
//=> AAAAA

**/

function repeat(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('repeat-string expects a string.')
  }

  if (num === 1) return str
  if (num === 2) return str + str

  var max = str.length * num
  if (cache !== str || typeof cache === 'undefined') {
    cache = str
    res = ''
  }

  while (max > res.length && num > 0) {
    if (num & 1) {
      res += str
    }

    num >>= 1

    if (!num) break
    str += str
  }

  return res.substr(0, max)
}

module.exports = repeat
