var stringify = require('./stringify')

function lowerCase (str) {
  return stringify(str).toLowerCase()
}

module.exports = lowerCase
