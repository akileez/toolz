// Tests whether all elements in the array pass the test
// implemented by the provided function

function every (arr, fn) {
  var res = true
  if (arr == null) return res

  var i = -1
  var len = arr.length

  while (++i < len) {
    if (!fn(arr[i], i, arr)) {
      res = false
      break
    }
  }

  return res
}

module.exports = every
