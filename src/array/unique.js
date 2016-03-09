// Return a new Array of unique items.
// IMPORTANT: duplicates are removed starting from begining of array.

var filter = require('./filter')
var convert = require('./convert')

function unique (array, compare) {
  array = convert(array)
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
