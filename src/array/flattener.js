var arrPush      = require('./append')
var isArguments  = require('../lang/isArguments')
var isArray      = require('../lang/isArray')
var isArrayLike  = require('../lang/isArrayLike')
var isObjectLike = require('../lang/isObjectLike')

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param   {Array} array The array to flatten.
 * @param   {boolean} [isDeep] Specify a deep flatten.
 * @param   {boolean} [isStrict] Restrict flattening to arrays-like objects.
 * @param   {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */

function flattener (arr, isDeep, isStrict, result) {
  if (arr == null || arr.length < 1) return []
  result = result || []

  var idx = -1
  var len = arr.length

  while (++idx < len) {
    var val = arr[idx]

    if (isObjectLike(val)
      && isArrayLike(val)
      && (isStrict || isArray(val) || isArguments(val)))
    { // recursively flatten arrays (susceptable to call stack limits)
      if (isDeep) flattener(val, isDeep, isStrict, result)
      else arrPush(result, val)
    } else {
      if (!isStrict) result[result.length] = val
    }
  }
  return result
}

module.exports = flattener
