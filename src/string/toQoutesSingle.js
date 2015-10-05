var replace = require('../regex/replace2')

function singleQuotes (str) {
  var re = /(?:\\*)?"([^"\\]*\\.)*[^"]*"/g

  return replace(str, re, function (match) {
    return match
      // unescape double-quotes
      .replace(/\\"/g, '"')
      // escape escapes
      .replace(/(^|[^\\])(\\+)'/g, '$1$2\\\'')
      // escape single-quotes - round 1
      .replace(/([^\\])'/g, '$1\\\'')
      // escape single-quotes - round 2 (for consecutive single-quotes)
      .replace(/([^\\])'/g, '$1\\\'')
      // convert
      .replace(/^"|"$/g, '\'')
  })
}

module.exports = singleQuotes