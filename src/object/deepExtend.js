var isPlainObject = require('../lang/isPlainObject')
var forOwn = require('./forOwn')

function deepExtend (target) {
  var arg
  var len = arguments.length
  var i = 0

  while (++i < len) {
    arg = arguments[i]
    if (!arg) continue

    forOwn(arg, function (val, key) {
      var currVal = target[key]

      if (isPlainObject(val) && isPlainObject(currVal)) {
        deepExtend(currVal, val)
      } else {
        target[key] = val
      }
    })
  }
  return target
}

module.exports = deepExtend
