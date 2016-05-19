var isNumber = require('./isFinite')

function isInteger (value) {
  return isNumber(value) && (value % 1 === 0)
}

module.exports = isInteger
