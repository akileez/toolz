var toString = require('../lang/toString')
var lowerCase = require('./case-lower')
var upperCase = require('./case-upper')

function properCase (str) {
  str = toString(str)
  return lowerCase(str).replace(/^\w|\s\w/g, upperCase)
}

module.exports = properCase
