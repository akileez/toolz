// Alias for Array.prototype.push(). like array/append but takes individual items.
// adds one or more elements to the end of an array
// and returns the new length of the array

// Not as fast as [].prototype.push but it has the ability to parse arrays
// without using call/apply

var slice = require('./sliced')
var isPrimitive = require('../lang/isPrimitive')
var isArray = require('../lang/isArray')

function push (arr, args) {
  if (!args) return arr
  var len = arr.length

  if (arguments.length === 2) {
    if (isPrimitive(args) || !isArray(args)) {
      arr[len] = args
      return arr
    } else {
      var len2 = args.length
    }
  } else {
    args = slice(arguments, 1)
    len2 = args.length
  }

  var i = -1

  while (++i < len2) {
    arr[len + i] = args[i]
  }

  return arr.length
}

module.exports = push
