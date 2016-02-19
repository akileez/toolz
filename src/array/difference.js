// Return a new Array with elements that aren't present
// in the other Arrays besides the first one

var slice = require('./slice')
var filter = require('./filter')
var unique = require('./uniq')
var some = require('./some')
var contains = require('./contains')

function difference (arr) {
  var arrs = slice(arguments, 1)
  var result = filter(unique(arr), function (needle) {
    return !some(arrs, function (haystack) {
      return contains(haystack, needle)
    })
  })
  return result
}

module.exports = difference
