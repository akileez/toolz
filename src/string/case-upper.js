var stringify = require('./stringify')

function upperCase (str) {
  return stringify(str).toUpperCase()
}

module.exports = upperCase
