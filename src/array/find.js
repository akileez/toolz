var findIndex = require('./findIndex')

function find (arr, iterator, thisObj) {
  var idx = findIndex(arr, iterator, thisObj)
  return idx >= 0 ? arr[idx] : void(0)
}

module.exports = find
