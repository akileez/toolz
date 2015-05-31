var isKind = require('./isKind')

function isNumber (value) {
  return isKind(value, 'number')
}

module.exports = isNumber
