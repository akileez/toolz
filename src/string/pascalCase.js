var toString = require('../lang/toString')
var camelCase = require('./camelCase')
var upperCase = require('./upperCase')

function pascalCase (str) {
  str = toString(str)
  return camelCase(str).replace(/^[a-z]/, upperCase)
}

module.exports = pascalCase
