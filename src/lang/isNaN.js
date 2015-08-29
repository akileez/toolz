var isNumber = require('./isNumber')
var $isNaN = require('../number/isNaN')

function isNaN (value) {
  return !isNumber(value) || $isNaN(Number(value))
}

module.exports = isNaN
