var makeIterator = require('../function/makeIterator_')

function map (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var results = []
  if (arr == null) return results
  var idx = -1
  var len = arr.length
  while (++idx < len) {
    results[idx] = fn(arr[idx], idx, arr)
  }
  return results
}

module.exports = map
