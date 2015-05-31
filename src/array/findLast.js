var findLastIndex = require('./findLastIndex')

function findLast (arr, iter, thisObj) {
  var idx = findLastIndex(arr, iter, thisObj)
  return idx >= 0 ? arr[idx] : void(0)
}

module.exports = findLast
