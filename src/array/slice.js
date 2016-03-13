// Base implementation of "slice" without an iteratee call guard
// Returns a new array containing the items in arr from start to end.

// If strt is omitted, it will start at 0.
// If end is omitted, it will use the last index of the array.
// If start or end is negative, it is used as an offset from the end of the array.

// It will also convert array-like objects to arrays.

function slice (arr, strt, end) {
  var i = -1
  var len = arr.length

  // check start position
  strt = strt == null
    ? 0
    : (+strt || 0)

  if (strt < 0) strt = -strt > len ? 0 : (len + strt)

  // check end position
  end = (end === undefined || end > len)
    ? len
    : (+end || 0)

  if (end < 0) end += len

  // check length
  len = strt > end
    ? 0
    : ((end - strt) >>> 0)

  strt >>>= 0

  var result = Array(len)

  while (++i < len) {
    result[i] = arr[i + strt]
  }

  return result
}

module.exports = slice
