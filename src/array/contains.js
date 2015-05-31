var indexOf = require('./indexOf')

function contains (arr, value) {
  return indexOf(arr, value) !== -1
}

module.exports = contains
