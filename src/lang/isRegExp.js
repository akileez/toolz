var kindOf = require('./kindOf')

function isRegExp (value) {
  return kindOf(value) === 'regexp'
}

module.exports = isRegExp
