// Call methodName on each item of the array passing custom arguments if needed.

var slice = require('./slice')

function invoke (arr, methodName, var_args) {
  if (arr == null) return arr

  var args = slice(arguments, 2)
  var i = -1
  var len = arr.length
  var value

  while (++i < len) {
    value = arr[i]
    value[methodName].apply(value, args)
  }
  return arr
}

module.exports = invoke
