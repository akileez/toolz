// adopted from set-value <>
//

var isObject = require('../lang/isPlainObject')
var isArray  = require('../lang/isArray')
var isString = require('../lang/isString')
var extend   = require('../object/extend')
var toPath   = require('./toPath')

function setvalue (obj, path, val) {
  if (!isObject(obj)) return obj
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

    if (!isObject(obj[key])) obj[key] = {}

    obj = obj[key]
  }

  if (obj.hasOwnProperty(last) && isObject(obj[last])) extend(obj[last, val])
  else obj[last] = val

  return res
}

module.exports = setvalue
