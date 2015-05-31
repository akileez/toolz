var makeIterator = require('../function/makeIterator')

function findIndex (arr, iter, thisObj){
  iter = makeIterator(iter, thisObj)
  if (arr == null) return -1
  var i = -1
  var len = arr.length
  while (++i < len) {
    if (iter(arr[i], i, arr)) return i
  }
return -1
}

module.exports = findIndex
