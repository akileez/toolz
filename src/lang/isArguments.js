var kindOf = require('./kindOf')

function isArguments (value) {
  return kindOf(value) === 'arguments'
}

module.exports = isArguments
