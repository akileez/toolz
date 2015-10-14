// Alias for pick.before().
// Returns all elements of the array except the last element

var pick = require('./pick').initial

function initial (arr) {
  return pick(arr)
}

module.exports = initial
