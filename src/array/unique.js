// Return a new Array of unique items.
// IMPORTANT: duplicates are removed starting from begining of array.

var filter = require('./filter')

function unique (array, compare) {
  compare = compare || isEqual
  var len = array.length

  return filter(array, function (item, i, arr) {
    while (++i < len) {
      if (compare(item, arr[i])) return false
    }

    return true
  })
}

function isEqual (a, b) {
  return a === b
}

module.exports = unique
