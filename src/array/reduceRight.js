// Apply a function simultaneously against two values of the array
// (from right-to-left) as to reduce it to a single value.

function reduceRight (arr, fn, acc) {
  var init = arguments.length > 2

  if (arr == null || !arr.length) {
    if (init)
      return acc
    else
      throw new Error('reduce of empty array with no initial value')
  }

  var i   = arr.length
  var res = acc
  var val

  while (--i >= 0) {
    val = arr[i]

    if (!init) {
      res = val
      init = true
    } else {
      res = fn(res, val, i, arr)
    }
  }

  return res
}

module.exports = reduceRight
