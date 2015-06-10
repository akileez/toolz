var makeIterator = require('../function/makeIterator_')

function findLastIndex (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  if (arr == null) return -1

  var len = arr.length
  while (--len >= 0) {
    if (fn(arr[len], len, arr)) return len
  }
  return -1
}

module.exports = findLastIndex
