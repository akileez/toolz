var toString = require('../lang/toString')
var camelCase = require('./case-camelize')
var upperCase = require('./case-upper')

function pascalCase (str) {
  str = toString(str)
  return camelCase(str).replace(/^[a-z]/, upperCase)
}

module.exports = pascalCase
