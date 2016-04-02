var toString = require('../lang/toString')
var repeat = require('./repeat')

function rpad (str, minLen, ch) {
  str = toString(str)
  ch = ch || ' '

  return (str.length < minLen)
    ? str + repeat(ch, minLen - str.length)
    : str
}

module.exports = rpad
