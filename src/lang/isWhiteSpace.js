var whitespace = require('../regex/whitespace')

function isWhiteSpace (str) {
  return whitespace().test(str)
}

module.exports = isWhiteSpace
