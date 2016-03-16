// Alias for pick.last()

var pick = require('./pick').last

function last (arr) {
  if (arr == null || arr.length < 1) return undefined
  return pick(arr)
}

module.exports = last
