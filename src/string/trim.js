var stringify    = require('./stringify')
var WHITE_SPACES = require('./WHITE_SPACES')

// remove white spaces from beginning and end of string
function trim (str, chars) {
  str = stringify(str)
  chars = chars || WHITE_SPACES
  return ltrim(rtrim(str, chars), chars)
}

// remove chars from beginning of string
function ltrim (str, chars) {
  str = stringify(str)
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

// remove chars from end of string
function rtrim (str, chars) {
  str = stringify(str)
  chars = chars || WHITE_SPACES

  var end = str.length - 1
  var charLen = chars.length
  var found = true
  var i
  var c

  while (found && end >= 0) {
    found = false
    i = -1
    c = str.charAt(end)

    while (++i < charLen) {
      if (c === chars[i]) {
        found = true
        end--
        break
      }
    }
  }
  return (end >= 0) ? str.substring(0, end + 1) : ''
}

module.exports = trim
module.exports.left = ltrim
module.exports.right = rtrim
