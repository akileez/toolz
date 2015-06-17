var toObject = require('../lang/toObject')

// the base implementation of "get" without support for string paths
// and default values

function baseGet (object, path, pathKey) {
  if (object == null) return
  if (pathKey !== undefined && pathKey in toObject(object)) path = [pathKey]

  var idx = 0
  var len = path.length

  while (object != null && idx < len) {
    object = object[path[idx++]]
  }
  return (idx && idx == len) ? object : undefined
}

module.exports = baseGet
