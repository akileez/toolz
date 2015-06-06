// a specialized version of lodash's `_.every` for arrays without support
// for callback shorthands and `this` binding

// @praram {Array} [arr] the array to iterate over
// @praram {Function} [fn] the function invoked per iteration
// @returns {Boolean} Returns `true` if all elements pass the function (callback) check
// else `false

function arrayEvery (arr, fn) {
  var idx = -1
  var len = arr.length

  while (++idx < len) {
    if (!fn(arr[idx], idx, arr)) return false
  }
  return true
}

module.exports = arrayEvery