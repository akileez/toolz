var isKind = require('./isKind')

function isRegExp (value) {
  return isKind(value, 'regexp')
}

module.exports = isRegExp