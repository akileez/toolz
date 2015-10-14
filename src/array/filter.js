// Creates a new array with all elements that pass the callback test.
// specialized version without support for callback shorthands and "this" binding

function filter (arr, fn) {
  var result = []
  if (arr == null) return result

  var val
  var i = -1
  var j = -1
  var len = arr.length

  while (++i < len) {
    val = arr[i]
    if (fn(val, i, arr)) result[++j] = val
  }
  return result
}

module.exports = filter
