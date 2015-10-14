// Return a new Array with elements common to all Arrays
// It will remove duplicates.

var slice = require('./slice')
var filter = require('./filter')
var unique = require('./unique')
var every = require('./every')
var contains = require('./contains')

function intersection (arr) {
  var arrs = slice(arguments, 1)
  var result = filter(unique(arr), function (needle) {
    return every(arrs, function (haystack) {
      return contains(haystack, needle)
    })
  })
  return result
}

module.exports = intersection
