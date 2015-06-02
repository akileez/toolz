var toString = require('../lang/toString')

function contains (str, substring, fromIndex) {
  str = toString(str)
  substring = toString(substring)
  return str.indexOf(substring, fromIndex) !== -1
}

module.exports = contains
