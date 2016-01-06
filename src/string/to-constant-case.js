var toSnakeCase = require('./to-snake-case')

// convert a string to constant case

function toConstantCase (str) {
  return toSnakeCase(str).toUpperCase()
}

module.exports = toConstantCase
