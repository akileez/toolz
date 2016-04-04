var stringify = require('./stringify')
var repeat    = require('./repeat-str')

function pad (str, len, ch) {
  str = stringify(str)
  len = ~~len

  var padlen = 0

  if (!ch) ch = ' '
  else if (ch.length > 1) ch = ch.charAt(0)

  padlen = len - str.length
  return repeat(ch, Math.ceil(padlen / 2)) + str + repeat(ch, Math.floor(padlen / 2))
}

function lpad (str, minLen, ch) {
  str = stringify(str)
  minLen = ~~minLen
  ch = ch || ' '

  return (str.length < minLen)
    ? repeat(ch, minLen - str.length) + str
    : str
}

function rpad (str, minLen, ch) {
  str = stringify(str)
  minLen = ~~minLen
  ch = ch || ' '

  return (str.length < minLen)
    ? str + repeat(ch, minLen - str.length)
    : str
}

module.exports = pad
module.exports.left = lpad
module.exports.right = rpad
