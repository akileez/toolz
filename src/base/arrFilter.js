// a specialized version of "filter" for arrays without support for callback
// shorthands and "this" binding

function arrFilter (arr, predicate) {
  var idx = -1
  var len = arr.length
  var resIdx = -1
  var result = []

  while (++idx < len) {
    var value = arr[idx]
    if (predicate(value, idx, arr)) result[++resIdx] = value
  }
  return result
}

module.exports = arrFilter
