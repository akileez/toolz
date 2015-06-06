function arrayCopy (src, arr) {
  var idx = -1
  var len = src.length

  arr || (arr = Array(len))
  while (++idx < len) {
    arr[idx] = src[idx]
  }
  return arr
}

module.exports = arrayCopy
