// inspired by: indexed-filter <https://github.com/shinnn/indexed-filter>

// Creates a new array with all elements with indice that pass the callback test.
// specialized version without support for callback shorthands and "this" binding

function filterd (arr, fn) {
  var result = []
  if (arr == null) return result

  var val = {}
  var i = -1
  var j = -1
  var len = arr.length

  while (++i < len) {
    val = {val: arr[i], idx: i}
    if (fn(val, i, arr)) result[++j] = val
  }
  return result
}

module.exports = filterd
