var isNumber = require('./isNumber')

function isInteger (value) {
  return isNumber(value) && (value % 1 === 0)
}

module.exports = isInteger
