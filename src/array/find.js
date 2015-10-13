// Loops through all the items in the Array and
// returns the first one that passes a truth test (callback).

var findIndex = require('./findIndex')

function find (arr, fn) {
  var idx = findIndex(arr, fn)

  return idx >= 0
    ? arr[idx]
    : void (0)
}

module.exports = find
