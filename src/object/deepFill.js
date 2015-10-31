var forOwn = require('./forOwn')
var isPlainObject = require('../lang/isPlainObject')

// deeply copy missing properties in the target from the defaults
// like lodash "_.defaults"

function deepFillIn (target, defaults) {
  var i = 0
  var n = arguments.length
  var obj

  while (++i < n) {
    obj = arguments[i]
    if (obj) {
      forOwn(obj, function (newValue, key) {
        var curValue = target[key]
        if (curValue == null) target[key] = newValue
        else if (isPlainObject(curValue) && isPlainObject(newValue)) {
          deepFillIn(curValue, newValue)
        }
      })
    }
  }
  return target
}

module.exports = deepFillIn
