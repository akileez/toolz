baseGet = require('../base/baseGet'),
baseSlice = require('../base/baseSlice'),
isArguments = require('../lang/isArguments'),
isArray = require('../lang/isArray'),
isIndex = require('../lang/isIndex'),
isKey = require('../lang/isKey'),
isLength = require('../lang/isLength'),
last = require('../array/last'),
toPath = require('../base/toPath');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;


// Checks if `path` is a direct property.

function has (object, path) {
  if (object == null) return false

  var result = hasOwnProperty.call(object, path)
  if (!result && !isKey(path)) {
    path = toPath(path)
    object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, 1))
    if (object == null) return false
    path = last(path)
    result = hasOwnProperty.call(object, path)
  }
  return result || (
    isLength(object.length)
    && isIndex(path, object.length)
    && (isArray(object)
    || isArguments(object))
  )
}

module.exports = has
