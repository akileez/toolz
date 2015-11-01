var hasOwn    = require('./hasOwn')
var deepClone = require('../lang/deepClone')
var isObject  = require('../lang/isPlainObject')

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

  while ((obj = arguments[i++])) {
    for (key in obj) {
      if (!hasOwn(obj, key)) continue

      val = obj[key]

      if (isObject(val) && isObject(target[key])) {
        // inception, deep merge objects
        target[key] = merge(target[key], val)
      } else {
        // else make sure arrays, rexexp, date, objects are cloned
        target[key] = deepClone(val)
      }
    }
  }

  return target
}

module.exports = merge
