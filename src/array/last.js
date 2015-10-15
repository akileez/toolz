// Alias for pick.last()

var pick = require('./pick').last

function last (arr) {
  return pick(arr)
}

module.exports = last
