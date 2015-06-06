function arrayEach (arr, fn) {
  var idx = -1
  var len = arr.length

  while (++idx < len) {
    if (fn(arr[idx], idx, arr) === false) break
  }
  return arr
}