function map (arr, fn) {
  var results = []
  if (arr == null) return results

  var idx = -1
  var len = arr.length

  while (++idx < len) {
    results[idx] = fn(arr[idx], idx, arr)
  }
  return results
}

module.exports = map
