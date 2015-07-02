var toSnakeCase = require('./toSnakeCase')

// convert a string to constant case

function toConstantCase (str) {
  return toSnakeCase(str).toUpperCase()
}

module.exports = toConstantCase
