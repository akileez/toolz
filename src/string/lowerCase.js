var toString = require('../lang/toString')

function lowerCase (str) {
  str = toString(str)
  return str.toLowerCase()
}

module.exports = lowerCase
