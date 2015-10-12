var findLastIndex = require('./findLastIndex')

function findLast (arr, fn) {
  var idx = findLastIndex(arr, fn)

  return idx >= 0
    ? arr[idx]
    : void (0)
}

module.exports = findLast
