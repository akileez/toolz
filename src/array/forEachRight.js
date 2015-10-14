function forEachRight (arr, fn) {
  var len = arr.length

  while (len--) {
    if (fn(arr[len], len, arr) === false) break
  }
}

module.exports = forEachRight
