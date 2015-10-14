var whitespace = require('./rex-whitespace')
var contains = require('./contains')

function isWhiteSpace (str) {
  return contains(whitespace, str)
}

module.exports = isWhiteSpace
