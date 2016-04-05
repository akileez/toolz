var stringify = require('./stringify')
var lowerCase = require('./case-lower')
var upperCase = require('./case-upper')

// replace first char of each sentence (new line or after '.\s+') to
// UPPERCASE and lowercase other chars

function sentenceCase (str) {
  return lowerCase(stringify(str)).replace(/(^\w)|\.\s+(\w)/gm, upperCase)
}

module.exports = sentenceCase
