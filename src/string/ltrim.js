var toString = require('../lang/toString')
var WHITE_SPACES = require('./WHITE_SPACES')

function ltrim (str, chars) {
  str = toString(str)
  chars = chars || WHITE_SPACES

  var start = 0
  var len = str.length
  var charLen = chars.length
  var found = true
  var i
  var c

  while (found && start < len) {
    found = false
    i = -1
    c = str.charAt(start)

    while (++i < charLen) {
      if (c === chars[i]) {
        found = true
        start++
        break
      }
    }
  }
  return (start >= len) ? '' : str.substr(start, len)
}

module.exports = ltrim
