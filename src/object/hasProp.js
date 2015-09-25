var baseGet = require('../base/baseGet')
var baseSlice = require('../base/baseSlice')
var isArguments = require('../lang/isArguments')
var isArray = require('../lang/isArray')
var isIndex = require('../lang/isIndex')
var isKey = require('../lang/isKey')
var isLength = require('../lang/isLength')
var last = require('../array/last')
var toPath = require('../string/toPath')
var hasOwn = require('./hasOwn')

// Checks if `path` is a direct property.

function has (object, path) {
  if (object == null) return false

  var result = hasOwnProperty.call(object, path)
  if (!result && !isKey(path)) {
    path = toPath(path)
    object = path.length === 1 ? object : baseGet(object, baseSlice(path, 0, 1))
    if (object == null) return false
    path = last(path)
    result = hasOwn(object, path)
  }
  return result || (
    isLength(object.length)
    && isIndex(path, object.length)
    && (isArray(object)
    || isArguments(object))
  )
}

module.exports = has
