var kindOf = require('./kindOf')

function isObject (value) {
  return kindOf(value) === 'object'
}

module.exports = isObject
