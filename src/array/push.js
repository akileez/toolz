// Alias for Array.prototype.push(). like array/append but takes individual items.
// adds one or more elements to the end of an array
// and returns the new length of the array

var slice = require('./sliced')

function push (arr, args) {
  args = Array.isArray(args)
    ? args
    : slice(arguments, 1)

  var i = -1
  var len1 = arr.length
  var len2 = args.length

  while (++i < len2) {
    arr[len1 + i] = args[i]
  }

  return arr
}

module.exports = push
