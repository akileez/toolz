var isKind = require('./isKind')

function isFunction (value) {
  return isKind(value, 'function')
}

module.exports = isFunction
