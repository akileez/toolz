var forOwn = require('./forOwn')
var isPlainObject = require('../lang/isPlainObject')

// mixes objexts into target object, recursively mixing
// existing child objects

function deepMixIn (target, objects) {
  var i = 0
  var n = arguments.length
  var obj

  while (++i < n) {
    obj = arguments[i]
    if (obj) forOwn(obj, copyProp, target)
  }
  return target
}

function copyProp (value, key) {
  var existing = this[key]
  if (isPlainObject(value) && isPlainObject(existing)) deepMixIn(existing, value)
  else this[key] = value
}

module.exports = deepMixIn
