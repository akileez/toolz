var kindOf = require('./kindOf')

function isDate (value) {
  return kindOf(value) === 'date'
}

module.exports = isDate
