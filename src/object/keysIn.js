var isArguments = require('../lang/isArguments')
var isArray     = require('../lang/isArray')
var isIndex     = require('../lang/isIndex')
var isLength    = require('../lang/isLength')
var isObject    = require('../lang/isObject')
var hasOwn      = require('./hasOwn')

// creates an array of the own and inherited enumable property names
// of "object". Note Non-objects values are coerced to objects
// lodash version

function keysIn (obj) {
  if (obj == null) return []
  if (!isObject(obj)) obj = Object(obj)

  var len = obj.length
  len = (len && isLength(len) && (isArray(obj) || isArguments(obj)) && len) || 0

  var Ctor = obj.constructor
  var idx = -1
  var isProto = typeof Ctor == 'function' && Ctor.prototype === obj
  var result = Array(len)
  var skipIndexes = len > 0

  while (++idx < len) {
    result[idx] = (idx + '')
  }
  for (var key in obj) {
    if (!(skipIndexes && isIndex(key, len)) && !(key == 'constructor' && (isProto || hasOwn(obj, key)))) {
      result.push(key)
    }
  }
  return result
}

module.exports = keysIn
