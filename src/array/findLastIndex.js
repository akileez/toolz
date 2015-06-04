var makeIterator = require('../function/makeIterator_')

function findLastIndex (arr, iter, thisObj) {
  iter = makeIterator(iter, thisObj)
  if (arr == null) return -1
  var len = arr.length
  while (--len >= 0) {
    if (iter(arr[len], len, arr)) return len
  }
  return -1
}

module.exports = findLastIndex
