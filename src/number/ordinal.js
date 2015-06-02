var toInt = require('./toInt')
var nth = require('./nth')

// converts number into ordinal form

function ordinal (n) {
  n = toInt(n)
  return n + nth(n)
}

module.exports = ordinal
