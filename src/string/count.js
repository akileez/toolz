var stringify = require('./stringify')

function count (str, substr) {
  str = stringify(str)
  substr = stringify(substr)

  if (str.length === 0 || substr.length === 0) return 0

  return str.split(substr).length - 1
}

module.exports = count
