// Returns an array sorted by the result of the callback.

// The callback is called for each item that is to be sorted,
// and the results of the callback are used to sort the array.
// The callback is called with the item as the first parameter,
// optionally with the provided context.

// It also supports a shorthand notation which can be used to sort by a property name.

var sort = require('./sort')
var makeIterator = require('../function/makeIterator_')

function sortBy (arr, fn, context) {
  fn = makeIterator(fn, context)
  return sort(arr, function (a, b) {
    a = fn(a)
    b = fn(b)
    return (a < b) ? -1 : ((a > b) ? 1 : 0)
  })
}

module.exports = sortBy
