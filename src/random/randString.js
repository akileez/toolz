var isNumber = require('../lang/isNumber')
var isString = require('../lang/isString')
var randInt = require('./randInt')

var defaultDict = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function randomString (length, dictionary) {
  if (!isNumber(length) || length < 0) length = 8
  if (!isString(dictionary) || dictionary.length < 1) dictionary = defaultDict

  var result = ''
  var domain = dictionary.length -1
  while (length--) {
    result += dictionary[randInt(0, domain)]
  }
  return result
}

module.exports = randomString
