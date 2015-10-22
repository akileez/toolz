// Returns a new array containing the items from arr
// from the start index to the end index.

// If start is omitted, it will start at 0.
// If end is omitted, it will used the last index of the array.
// If start or end is negative, it is used as an offset from the end of the array.

// It will also convert array-like objects to arrays.

function slice (arr, start, end) {
  var len = arr.length
  var result = []
  var j = -1

  if (start == null) start = 0
  else if (start < 0) start = Math.max(len + start, 0)
  else start = Math.min(start, len)

  if (end == null) end = len
  else if (end < 0) end = Math.max(len + end, 0)
  else end = Math.min(end, len)

  while (start < end) {
    result[++j] = arr[start++]
  }

  return result
}

module.exports = slice
