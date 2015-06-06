function arrayEachRight (arr, fn) {
  var len = arr.length

  while (len--) {
    if (fn(arr[len], len, arr) === false) break
  }
  return arr
}

module.exports = arrayEachRight
