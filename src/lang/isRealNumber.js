var isNumber = require('./isNumber')
var GLOBAL = require('./GLOBAL')

function isRealNumber (value) {
  return isNumber(value) && GLOBAL.isFinite(value)
}

module.exports = isRealNumber
