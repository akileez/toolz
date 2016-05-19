var isNumber = require('../lang/isNumber')
var GLOBAL = require('../lang/GLOBAL')

function isRealNumber (value) {
  return isNumber(value) && GLOBAL.isFinite(value)
}

module.exports = isRealNumber
