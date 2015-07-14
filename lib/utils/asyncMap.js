function _map (arr, iterator) {
  var idx = -1
  var len = arr.length
  var result = Array(len)

  while (++idx < len) {
    result[idx] = iterator(arr[idx], idx, arr)
  }
  return result
}

module.exports = _map
