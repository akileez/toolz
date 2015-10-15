// Loops through all the items in the Array (starting from last item)
// and returns the first one that passes a truth test (callback).

var findLastIndex = require('./findLastIndex')

function findLast (arr, fn, thisObj) {
  var idx = findLastIndex(arr, fn, thisObj)

  return idx >= 0
    ? arr[idx]
    : void (0)
}

module.exports = findLast
