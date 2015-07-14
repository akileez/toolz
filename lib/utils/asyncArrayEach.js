function _arrayEach (arr, iterator) {
  var idx = -1
  var len = arr.length
  while (++idx < len) {
    iterator(arr[idx], idx, arr)
  }
}

module.exports = _arrayEach
