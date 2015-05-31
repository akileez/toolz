function reduce (arr, fn, initVal) {
  var hasInit = arguments.length > 2
  var result = initVal

  if (arr == null || !arr.length) {
    if (!hasInit) throw new Error('reduce of empty array with no initial value')
    else return initVal
  }

  var i = -1
  var len = arr.length
  while (++i < len) {
    if (!hasInit) {
      result = arr[i]
      hasInit = true
    } else {
      result = fn(result, arr[i], i, arr)
    }
  }
  return result
}

module.exports = reduce
