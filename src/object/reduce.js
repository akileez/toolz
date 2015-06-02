var forOwn = require('./forOwn')
var size = require('./size')

// object reduce

function reduce (obj, fn, memo, thisObj) {
  var initial = arguments.length > 2

  if (!size(obj) && !initial) throw new Error('reduce of empty object with no initial value')

  forOwn(obj, function (value, key, list) {
    if (!initial) {
      memo = value
      initial = true
    } else {
      memo = fn.call(thisObj, memo, value, key, list)
    }
  })
  return memo
}

module.exports = reduce
