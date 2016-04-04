var stringify = require('./stringify')
var lowerCase = require('./case-lower')
var upperCase = require('./case-upper')

function properCase (str) {
  return lowerCase(stringify(str)).replace(/^\w|\s\w/g, upperCase)
}

module.exports = properCase
