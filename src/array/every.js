function every (arr, fn) {
  var result = true
  if (arr == null) return result

  var i = -1
  var len = arr.length

  while (++i < len) {
    if (!fn(arr[i], i, arr)) {
      result = false
      break
    }
  }
  return result
}

module.exports = every
