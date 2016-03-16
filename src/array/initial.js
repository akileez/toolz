// Alias for pick.before().
// Returns all elements of the array except the last element

var pick = require('./pick').initial

function initial (arr) {
  if (arr == null || arr.length < 1) return undefined
  return pick(arr)
}

module.exports = initial
