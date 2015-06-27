var kindOf = require('./isKind')

function isObject (value) {
  return kindOf(value) === 'object'
}

module.exports = isObject
