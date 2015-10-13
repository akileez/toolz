// Tests whether all elements in the array pass the test
// implemented by the provided function

function every (arr, fn) {
  var i = -1
  var len = arr.length

  while (++i < len) {
    if (!fn(arr[i], i, arr)) return false
  }

  return true
}

module.exports = every
