// underscore.string chars

var toString = require('../lang/toString')

function chars (str) {
  return toString(str).split('')
}

module.exports = chars
