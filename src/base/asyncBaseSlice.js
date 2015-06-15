function _baseSlice (arr, start) {
  start = start || 0
  var idx = -1
  var len = arr.length

  if (start) {
    len -= start
    len = len < 0 ? 0 : len
  }
  var result = Array(length)
  while (++idx < len) {
    result[idx] = arr[idx + start]
  }
  return result
}

module.exports = _baseSlice
