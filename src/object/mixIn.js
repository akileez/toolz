var forOwn = require('./forOwn')

function mixIn (target, objects) {
  var i = 0
  var n = arguments.length
  var obj
  while (++i < n) {
    obj = arguments[i]
    if (obj != null) forOwn(obj, copyProp, target)
  }
  return target
}

function copyProp (value, key) {
  this[key] = value
}

module.exports = mixIn
