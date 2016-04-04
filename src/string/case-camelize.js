var stringify      = require('./stringify')
var replaceAccents = require('./replace-accents')
var removeNonWord  = require('./remove-non-word')
var upperCase      = require('./case-upper')
var lowerCase      = require('./case-lower')

function camelCase (str) {
  str = stringify(str)
  str = replaceAccents(str)
  str = removeNonWord(str)
    .replace(/[\-_]/g, ' ')         // convert all hyphens and underscores to spaces
    .replace(/\s[a-z]/g, upperCase) // convert first char of each word to UPPERCASE
    .replace(/\s+/g, '')            // remove spaces
    .replace(/^[A-Z]/g, lowerCase)  // convert first char to lowercase
  return str
}

module.exports = camelCase
