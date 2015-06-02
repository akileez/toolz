var hasOwn = require('./hasOwn')
var deepClone = require('../lang/deepClone')
var isObject = require('../lang/isObject')

// deep merge objects

function merge () {
  var i = 1
  var key
  var val
  var obj
  var target

  // make sure we don't modify source elemnt and it's properties
  // objects are pass by reference
  target = deepClone(arguments[0])

  while (obj = arguments[i++]) {
    for (key in obj) {
      if (!hasOwn(obj, key)) continue

      val = obj[key]
      // inception, deep merge objects
      // else make sure arrays, rexexp, date, objects are cloned
      if (isObject(val) && isObject(target[key])) target[key] = merge(target[key], val)
      else target[key] = deepClone(val)
    }
  }
  return target
}

module.exports = merge
