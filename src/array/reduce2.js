// Apply a function against an accumulator and each value of the array
// (from left-to-right) as to reduce it to a single value.
// accumulator is the second parameter.

function reduce (arr, acc, fn) {
  var result = acc

  var i = -1
  var len = arr.length

  while (++i < len) {
    result = fn(result, arr[i], i, arr)
  }

  return result
}

module.exports = reduce