// adopted from: get-value <https://github.com/jonschlinkert/get-value>
// Copyright (c) 2014-2015, Jon Schlinkert. (MIT)

// get nested object property. supports an array of properties

var isString = require('toolz/src/lang/isString')
var isArray = require('toolz/src/lang/isArray')

function getValue (obj, prop) {
  var segs = toSegemnts(prop)

  if (segs === null) return obj

  var len = segs.length
  var i = -1

  while (obj && (++i < len)) {
    obj = obj[segs[i]]
  }

  return obj
}

function toSegemnts (val) {
  if (isArray(val)) return val
  if (isString(val)) return val.split('.')
  return null
}

module.exports = getValue
