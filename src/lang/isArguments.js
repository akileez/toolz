var kindOf = require('./kindOf')

function isArguments (value) {
  return isKind(value, 'arguments')
}

module.exports = isArguments