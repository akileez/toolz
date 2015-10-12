function some (arr, fn) {
  var result = false
  if (arr == null) return result

  var i = -1
  var len = arr.length

  while (++i < len) {
    if (fn(arr[i], i, arr)) {
      result = true
      break
    }
  }

  return result
}

module.exports = some
