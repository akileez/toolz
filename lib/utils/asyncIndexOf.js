function _indexOf (arr, item) {
  var i = -1
  var len = arr.length

  while (++i < len) {
    if (arr[i] === item) return i
  }
  return -1
}

module.exports = _indexOf
