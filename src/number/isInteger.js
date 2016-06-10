var isFinite = require('./isFinite')

function isInteger (value) {
  return isFinite(value) && (value % 1 === 0)
}

module.exports = isInteger
