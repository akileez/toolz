// Tests whether some element in the array passes the test
// implemented by the provided function. specialized version
// without support for callback shorthands and `this` binding.

function some (arr, fn) {
  var res = false
  if (arr == null) return res

  var i = -1
  var len = arr.length

  while (++i < len) {
    if (fn(arr[i], i, arr)) {
      res = true
      break
    }
  }

  return res
}

module.exports = some
