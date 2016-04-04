var toString = require('../lang/toString')

function capitalize (str, lowercaseRest) {
  str = toString(str)
  var remaining = !lowercaseRest ? str.slice(1) : str.slice(1).toLowerCase()

  return str.charAt(0).toUpperCase() + remaining
}

module.exports = capitalize
