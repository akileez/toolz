// Loops through all the items in the Array (starting from last item)
// and returns the first one that passes a truth test (callback).

var findLastIndex = require('./findLastIndex')

function findLast (arr, fn) {
  var idx = findLastIndex(arr, fn)

  return idx >= 0
    ? arr[idx]
    : void (0)
}

module.exports = findLast
