// Base implementation of "slice" without an iteratee call guard
// Returns a new array containing the items in arr from start to end.

// If str is omitted, it will start at 0.
// If end is omitted, it will use the last index of the array.
// If start or end is negative, it is used as an offset from the end of the array.

// It will also convert array-like objects to arrays.

function slice (arr, str, end) {
  var i = -1
  var len = arr.length

  // check start position
  str = str == null
    ? 0
    : (+str || 0)

  if (str < 0) str = -str > len ? 0 : (len + str)

  // check end position
  end = (end === undefined || end > len)
    ? len
    : (+end || 0)

  if (end < 0) end += len

  // check length
  len = str > end
    ? 0
    : ((end - str) >>> 0)

  str >>>= 0

  var result = Array(len)

  while (++i < len) {
    result[i] = arr[i + str]
  }

  return result
}

module.exports = slice
