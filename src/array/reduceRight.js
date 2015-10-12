function reduceRight (arr, fn, initVal) {
  var hasInit = arguments.length > 2

  if (arr == null || !arr.length) {
    if (hasInit) return initVal
    else throw new Error('reduce of empty array with no initial value')
  }

  var i = arr.length
  var result = initVal
  var value

  while (--i >= 0) {
    value = arr[i]

    if (!hasInit) {
      result = value
      hasInit = true
    } else {
      result = fn(result, value, i, arr)
    }
  }

  return result
}

module.exports = reduceRight
