var is        = require('./is')
var isObject  = require('./isPlainObject')
var isArray   = require('./isArray')
var objEquals = require('../object/equals')
var arrEquals = require('../array/equals')

function deepEquals (a, b, fn) {
  fn = fn || is
  var bothObjects = isObject(a) && isObject(b)
  var bothArrays = !bothObjects && isArray(a) && isArray(b)
  if (!bothObjects && !bothArrays) return fn(a, b)

  function compare (a, b) {
    return deepEquals(a, b, fn)
  }

  var method = bothObjects ? objEquals : arrEquals
  return method(a, b, compare)
}

module.exports = deepEquals
