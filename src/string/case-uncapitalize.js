var stringify = require('./stringify')

function decapitalize (str) {
  str = stringify(str)

  return str.charAt(0).toLowerCase() + str.slice(1)
}

module.exports = decapitalize
