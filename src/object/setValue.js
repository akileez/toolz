var isIndex = require('../lang/isIndex')
var isKey = require('../lang/isKey')
var isObject = require('../lang/isObject') // isObjectLike ? to capture arrays?
var toPath = require('../string/toPath')

// sets the property value of 'path' on 'object'. if a portion of 'path'
// does not exist, it is created

function setValue (obj, path, value) {
  if (obj == null) return obj

  var pathKey = (path + '')
  path = (obj[pathKey] != null || isKey(path, obj) ? [pathKey] : toPath(path))

  var idx = -1
  var len = path.length
  var lastIdx = len - 1
  var nested = obj

  while (nested != null && ++idx < len) {
    var key = path[idx]
    if (isObject(nested)) {
      if (idx === lastIdx) nested[key] = value
      else if (nested[key] == null) nested[key] = isIndex(path[idx + 1]) ? [] : {}
    }
    nested = nested[key]
  }
  return obj
}

module.exports = setValue
