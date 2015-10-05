var precise = require('./enforcePrecision')
var redent = require('../string/redent')

function toFixed (num, precision, units) {
  num = precise(num, precision || 2)
  return redent(String(num), units)
}

module.exports = toFixed
