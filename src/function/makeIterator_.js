var identity = require('./identity')
var prop = require('./prop')
var deepMatches = require('../object/deepMatches')

function makeIterator (src, thisObj) {
  if (src == null) return identity
  switch(typeof src) {
    case 'function' :
      return (typeof thisObj !== 'undefined') ? function (value, idx, arr) {
        return src.call(thisObj, value, idx, arr)
      } : src
    case 'object' :
      return function (value) {
        return deepMatches(value, src)
      }
    case 'string' :
    case 'number' :
      return prop(src)
  }
}

module.exports = makeIterator
