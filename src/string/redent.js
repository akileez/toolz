var striptIndent = require('./indentStrip')
var indentString = require('./indent')

function redent (str, num, char) {
  return indentString(striptIndent(str), char || ' ', num || 0)
}

module.exports = redent
