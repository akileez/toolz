var stringify = require('./stringify')
var repeat = require('./repeat-str')

function pad (str, len, padr, type) {
  str = stringify(str)
  len = ~~len

  var padlen = 0

  if (!padr) padr = ' '
  else if (padr.length > 1) padr = padr.charAt(0)

  switch (type) {
    case 'right':
      padlen = len - str.length
      return str + repeat(padr, padlen)
    case 'left':
      padlen = len - str.length
      return repeat(padr, padlen) + str
    default: // both
      padlen = len - str.length
      return repeat(padr, Math.ceil(padlen / 2)) + str + repeat(padr, Math.floor(padlen / 2))
  }
}

module.exports = pad
