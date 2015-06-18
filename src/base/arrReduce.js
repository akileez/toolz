// a specialized version of lodash "reduce" for arrays without support
// for callback shorthands and "this binding"

// * @private
// * @param   { Array} array The array to iterate over.
// * @param   { Function} iteratee The function invoked per iteration.
// * @param   { *} [accumulator] The initial value.
// * @param   { boolean} [initFromArray] Specify using the first element of `array`
// *  as the initial value.
// * @returns { *} Returns the accumulated value.

function arrReduce (arr, iteratee, accumulator, initFromArray) {
  var idx = -1
  var len = arr.length

  if (initFromArray && len) accumulator = arr[++idx]

  while (++idx < len) {
    accumulator = iteratee(accumulator, arr[idx], idx, arr)
  }
  return accumulator
}

module.exports = arrReduce
