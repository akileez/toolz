// returns the first index at which a given element
// can be found in the array, or -1 if it is not present.

function indexOf (arr, item, fromIndex) {
  fromIndex = fromIndex || 0
  if (arr == null) return -1

  var len = arr.length
  var iter = fromIndex < 0
    ? len + fromIndex
    : fromIndex

  while (iter < len) {
    if (arr[iter] === item) return iter
    iter++
  }
  return -1
}

module.exports = indexOf
