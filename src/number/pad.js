var lpad = require('../string/pad-left')
var toNumber = require('../lang/toNumber')

// add padding zeros if n.length < minLength

function pad (n, minLength, char) {
  n = toNumber(n)
  return lpad('' + n, minLength, char || '0')
}

module.exports = pad
