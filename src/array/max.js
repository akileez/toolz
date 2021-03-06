// Returns maximum value inside array or use a custom iterator
// to define how items should be compared.

function max (arr, fn) {
  if (arr == null || !arr.length) {
    return Infinity
  }

  if (arr.length && !fn) {
    return Math.max.apply(Math, arr)
  }

  var compare = -Infinity
  var value
  var temp
  var result

  var i = -1
  var len = arr.length

  while (++i < len) {
    value = arr[i]
    temp = fn(value, i, arr)

    if (temp > compare) {
      compare = temp
      result = value
    }
  }

  return result
}

module.exports = max
