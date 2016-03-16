/*
  Apply a function against an accumulator and each value of the array
  (from left-to-right) as to reduce it to a single value.
  Note: accumulator is the second parameter and is optional. The first
  value of the array passed will be the accumulator in that instance
*/

function reduce (arr, acc, fn) {
  var i

  if (arguments.length < 3) {
    fn = acc
    acc = arr[0]
    i = 0
  } else {
    i = -1
  }

  var result = acc
  var len = arr.length

  while (++i < len) {
    result = fn(result, arr[i], i, arr)
  }

  return result
}

module.exports = reduce
