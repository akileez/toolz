var isKind = require('./isKind')

function isDate (value) {
  return isKind(value, 'date')
}

module.exports = isDate
