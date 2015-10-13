// Creates a new array with all elements that pass the callback test.

function filter (arr, fn) {
  var result = []
  if (arr == null) return results

  var val
  var i = -1
  var len = arr.length

  while (++i < len) {
    val = arr[i]
    if (fn(val, i, arr)) result.push(val)
  }
  return result
}

module.exports = filter
