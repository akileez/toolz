var isObject = require('../lang/isPlainObject')
var isArray  = require('../lang/isArray')
var isString = require('../lang/isString')
var toPath   = require('./toPath')

function setvalue (obj, path, val) {
  if (!isObject(obj)) return obj
  if (isArray(path)) path = toPath(path)
  if (!isString(path)) return obj

  var segs = path.split('.')
  var last = segs.pop()

  if (segs) namespace(obj, segs)[last] = val
  else obj[path] = val
}

function namespace (obj, path) {
  var i = -1
  var len = path.length

  while (++i < len) {
    if (!obj[path[i]]) obj[path[i]] = {}
    obj = obj[path[i]]
  }

  return obj
}

module.exports = setvalue
