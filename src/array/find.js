var findIndex = require('./findIndex')

function find (arr, fn) {
  var idx = findIndex(arr, fn)

  return idx >= 0
    ? arr[idx]
    : void (0)
}

module.exports = find
