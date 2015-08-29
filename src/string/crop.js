var toString = require('../lang/toString')
var truncate = require('./truncate')

function crop (str, maxChars, append) {
  str = toString(str)
  return truncate(str, maxChars, append, true)
}

module.exports = crop
