// Push items into array only if they aren't contained by it.
// Returns an array of the the new length of the array and modified array.

var difference = require('./difference')
var slice      = require('./slice')
var push       = require('./push')

function insert (arr, items) {
  items = Array.isArray(items)
    ? items
    : slice(arguments, 1)

  var diff = difference(items, arr)

  if (diff.length) push(arr, diff)

  return arr.length
}

module.exports = insert
