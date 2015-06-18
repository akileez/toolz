/**
 * A specialized version of `_.some` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */

function arrSome (arr, predicate) {
  var idx = -1
  var len = arr.length

  while (++idx < len) {
    if (predicate(arr[idx], idx, arr)) return true
  }
  return false
}

module.exports = arrSome
