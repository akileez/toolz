var toSpaceCase = require('./toSpaceCase')

// convert a 'string' to dot case

function toDotCase (str) {
  return toSpaceCase(str).replace(/\s/g, '.')
}

module.exports = toDotCase
