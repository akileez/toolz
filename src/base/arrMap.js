// a specialized version of lodash map for arrays without support
// for callback shorthands and "this" binding

function arrMap (arr, iteratee) {
  var idx = -1
  var len = arr.length
  var result = Array(len)

  while (++idx < len) {
    result[idx] = iteratee(arr[idx], idx, arr)
  }
  return result
}

module.exports = arrMap
