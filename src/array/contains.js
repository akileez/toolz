// Checks if Array contains value. Alias to indexOf(arr, val) !== -1

var indexOf = require('./indexOf')

function contains (arr, value) {
  return indexOf(arr, value) !== -1
}

module.exports = contains
