var isKind = require('./isKind')

function isBoolean (value) {
  return isKind(value, 'boolean')
}

module.exports = isBoolean
