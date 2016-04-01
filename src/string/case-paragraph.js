var toString = require('../lang/toString')
var lowerCase = require('./case-lower')
var upperCase = require('./case-upper')

// UPPERCASE first cha of each sentence and lowercase other chars

function sentenceCase (str) {
  str = toString(str)

  // replace first char of each sentence (new line or after '.\s+') to
  // UPPERCASE
  return lowerCase(str).replace(/(^\w)|\.\s+(\w)/gm, upperCase)
}

module.exports = sentenceCase