var indexOf = require('./indexOf')

function remove (arr, item) {
  var idx = indexOf(arr, item)
  if (idx !== -1) arr.splice(idx, 1)
}

module.exports = remove
