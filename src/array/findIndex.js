function findIndex (arr, fn) {
  if (arr == null) return -1

  var i = -1
  var len = arr.length

  while (++i < len) {
    if (fn(arr[i], i, arr)) return i
  }
  return -1
}

module.exports = findIndex
