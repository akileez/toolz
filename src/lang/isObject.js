var isKind = require('./isKind')

function isObject (value) {
  return isKind(value, 'object')
}

module.exports = isObject
