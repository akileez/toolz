var isKind = require('./isKind')

function isString (value) {
  return isKind(value, 'string')
}

module.exports = isString
