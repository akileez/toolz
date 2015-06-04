var isFinite = require('./isFinite')
var isNumber = require('./isNumber')

function isRealNumber (value) {
  return isNumber(value) && isFinite(value)
}

module.exports = isRealNumber
