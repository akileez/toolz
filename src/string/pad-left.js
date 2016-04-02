var toString = require('../lang/toString')
var repeat = require('./repeat')

function lpad (str, minLen, ch) {
  str = toString(str)
  ch = ch || ' '

  return (str.length < minLen)
    ? repeat(ch, minLen - str.length) + str
    : str
}

module.exports = lpad
