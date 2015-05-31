function forEach (arr, fn, thisObj) {
  if (arr == null) return
  var i = -1
  var len = arr.length
  while (++i < len) {
    if (fn.call(thisObj, arr[i], i, arr) === false) break
  }
}

module.exports = forEach
