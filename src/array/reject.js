// Creates a new array with all the elements that do not pass
// the truth test. Opposite of filter().

function reject (arr, fn) {
  var result = []
  if (arr == null) return result

  var i = -1
  var j = -1
  var len = arr.length
  var val

  while (++i < len) {
    val = arr[i]
    if (!fn(val, i, arr)) result[++j] = val
  }

  return result
}

module.exports = reject
