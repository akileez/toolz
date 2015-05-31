var makeIterator = require('../function makeIterator')

function map (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var resuts = []
  if (arr == null) return results
  var iter = -1
  var len = arr.length
  while (++iter < len) {
    results[iter] = fn(arr[iter], iter, arr)
  }
  return results
}

module.exports = map
