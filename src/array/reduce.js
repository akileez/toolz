// Apply a function against an accumulator and each value of the array
// (from left-to-right) as to reduce it to a single value.

function reduce (arr, fn, acc) {
  var init = arguments.length > 2
  var result = acc

  if (arr == null || !arr.length) {
    if (!init)
      throw new Error('reduce of empty array with no initial value')
    else return acc
  }

  var i = -1
  var len = arr.length

  while (++i < len) {
    if (!init) {
      result = arr[i]
      init = true
    } else {
      result = fn(result, arr[i], i, arr)
    }
  }

  return result
}

module.exports = reduce
