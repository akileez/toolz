// Remove a single item from the array.
// IMPORTANT: it won't remove duplicates, just a single item.

var indexOf = require('./indexOf')

function remove (arr, item) {
  var idx = indexOf(arr, item)
  if (idx !== -1) arr.splice(idx, 1)
}

module.exports = remove
