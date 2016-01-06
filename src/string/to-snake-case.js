var toSpaceCase = require('./to-space-case')

// convert a 'string' to snake case

function toSnakeCase (str) {
  return toSpaceCase(str).replace(/\s/g, '_')
}

module.exports = toSnakeCase
