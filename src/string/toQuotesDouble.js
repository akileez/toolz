var replace = require('../regex/replace')

function doubleQuotes (str) {
  var re = /(?:\\*)?'([^'\\]*\\.)*[^']*'/g

  return replace(str, re, function (match) {
    return match
      // unescape single-quotes
      .replace(/\\'/g, '\'')
      // escape escapes
      .replace(/(^|[^\\])(\\+)"/g, '$1$2\\\"')
      // escape double-quotes
      .replace(/([^\\])"/g, '$1\\\"')
      // convert
      .replace(/^'|'$/g, '"');
  })
}

module.exports = doubleQuotes
