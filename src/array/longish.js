// adopted from: longest <https://github.com/jonschlinkert/longest>
// Copyright (c) 2014-2015, Jon Schlinkert. (MIT)

// Just like array/max but without the callback  to determine
// the comparison.

// max(arr, function (vak) {
//  return val.toString().length
// })

var assert = require('assert')
var values = require('../collection/values')

function longish (arr) {
  if (!arr || !arr.length) return null

  var comp = 0
  var item
  var ilen
  var outp

  var i = -1
  var len = arr.length

  while (++i < len) {
    item = arr[i].toString()
    ilen = item.length

    if (ilen > comp) {
      outp = item
      comp = ilen
    }
  }
  return outp
}

function longishValue (obj, prop) {
  assert(typeof obj === 'object')
  if (Array.isArray(obj)) return longish(values(obj, prop))
  return longish(values(obj))
}

module.exports = longish
module.exports.value = longishValue
