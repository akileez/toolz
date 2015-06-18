// specialized version of lodash "_reduceRight" for arrays withou support
// for callback shorthands and "this" binding
//
//  * @param {Array} array The array to iterate over.
 // * @param {Function} iteratee The function invoked per iteration.
 // * @param {*} [accumulator] The initial value.
 // * @param {boolean} [initFromArray] Specify using the last element of `array`
 // *  as the initial value.
 // * @returns {*} Returns the accumulated value.

function arrReduceRight (arr, iteratee, accumlator, initFromArray) {
  var len = arr.length
  if (initFromArray && len) accumlator = arr[--len]

  while (len--) {
    accumlator = iteratee(accumlator, arr[len], len, arr)
  }
  return accumlator
}

module.exports = arrReduceRight
