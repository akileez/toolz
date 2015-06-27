var kindOf = require('./kindOf')

function isArray (value) {
  return Array.isArray(value) || kindOf(value) === 'array'
}

module.exports = isArray
