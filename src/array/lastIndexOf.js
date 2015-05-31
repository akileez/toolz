function lastIndexOf (arr, item, fromIndex) {
  if (arr == null) return -1

  var len = arr.length
  fromIndex = (fromIndex == null || fromIndex >= len) ? len - 1 : fromIndex
  fromIndex = (fromIndex < 0) ? len + fromIndex : fromIndex

  while (fromIndex >= 0) {
    if (arr[fromIndex] === item) return fromIndex
    fromIndex--
  }
  return -1
}

module.exports = lastIndexOf
