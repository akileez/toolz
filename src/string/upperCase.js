var toString = require('../lang/toString')

function upperCase (str) {
  str = toString(str)
  return str.toUpperCase()
}

module.exports = upperCase
