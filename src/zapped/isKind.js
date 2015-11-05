var kindOf = require('./kindOf')

function isKind (value, kind) {
  return kindOf(value) === kind
}

module.exports = isKind
