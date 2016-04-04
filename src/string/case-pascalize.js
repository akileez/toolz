var stringify = require('./stringify')
var camelCase = require('./case-camelize')
var upperCase = require('./case-upper')

function pascalCase (str) {
  return camelCase(stringify(str)).replace(/^[a-z]/, upperCase)
}

module.exports = pascalCase
