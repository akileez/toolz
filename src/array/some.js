// Tests whether some element in the array passes the test
// implemented by the provided function. specialized version
// without support for callback shorthands and `this` binding.

function some (arr, fn) {
  var i = -1
  var len = arr.length

  while (++i < len) {
    if (fn(arr[i], i, arr)) return true
  }

  return false
}

module.exports = some
