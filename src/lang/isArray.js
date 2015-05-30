var isKind = require('./isKind')

function isArray (value) {
  return Array.isArray(value) || isKind(value, 'array')
}

module.exports = isArray
