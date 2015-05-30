var isNumber = require('./isNumber')
var GLOBAL = require('./GLOBAL')

function isFinite (value) {
  var finite = false
  if (typeof value === 'string' && value !== '') finite = GLOBAL.isFinite(parseFloat(value))
  else if (isNumber(value)) finite = GLOBAL.isFinite(value)
  return finite
}

module.exports = isFinite
