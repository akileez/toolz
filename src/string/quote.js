var surround = require('./surround')

function quote (str, quoteChar) {
  return surround(str, quoteChar || '"')
}

module.exports = quote
