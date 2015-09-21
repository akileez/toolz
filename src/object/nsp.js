// namespace a value and assign to a given object.
// `obj` is optional. returns modified obj

var set = require('./set')

function nsp (obj, key, val) {
  if (!key && !val) return obj

  if (val == null) {
    val = key
    key = obj
    obj = {}
  }

  if (obj === undefined) obj = {}

  if (key.indexOf('.') > -1) {
    set(obj, key, val)
  } else {
    obj[key] = val
  }

  return obj
}

module.exports = nsp
