// adopted from set-value <>
//

var isObjectLike = require('toolz/src/lang/isObjectLike')
var isArray      = require('toolz/src/lang/isArray')
var isString     = require('toolz/src/lang/isString')
var extend       = require('toolz/src/object/extend')
var toPath       = require('./toPath')

function setvalue (obj, path, val) {
  if (!isObjectLike(obj)) return obj
  if (isArray(path)) path = toPath(path)
  if (!isString(path)) return obj

  var segs = path.split('.')
  var len = segs.length
  var i = -1
  var res = obj
  var last

  while (++i < len) {
    var key = segs[i]

    if (i === len - 1) {
      last = key
      break
    }

    if (!isObjectLike(obj[key])) obj[key] = {}

    obj = obj[key]
  }

  if (obj.hasOwnProperty(last) && isObjectLike(obj[last])) extend(obj[last, val])
  else obj[last] = val

  return res
}

module.exports = setvalue
