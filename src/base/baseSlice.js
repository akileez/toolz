// base implementation of "slice" without an iteratee call guard

function baseSlice (arr, str, end) {
  var idx = -1
  var len = arr.length

  str = str == null ? 0 : (+str || 0)
  if (str < 0) str = -str > len ? 0 : (len + str)

  end = (end === undefined || end > len) ? len : (+end || 0)
  if (end < 0) end += len

  len = str > end ? 0 : ((end - str) >>> 0)
  str >>>= 0

  var result = Array(len)
  while (++idx < len) {
    result[idx] = arr[idx + str]
  }
  return result
}

module.exports = baseSlice
