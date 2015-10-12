function forEach (arr, fn) {
  if (arr == null) return

  var i = -1
  var len = arr.length

  while (++i < len) {
    if (fn(arr[i], i, arr) === false) break
  }
}

module.exports = forEach
