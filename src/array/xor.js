// Exclusive OR. Returns items that are present in a single array.
// It will remove duplicates.

var unique = require('./unique')
var filter = require('./filter')
var contains = require('./contains')

function xor (arr1, arr2) {
  arr1 = unique(arr1)
  arr2 = unique(arr2)

  var a1 = filter(arr1, function (item) {
    return !contains(arr2, item)
  })
  var a2 = filter(arr2, function (item) {
    return !contains(arr1, item)
  })

  return a1.concat(a2)
}

module.exports = xor
