var repeat = require('./repeat')
var assert = require('assert')
var replace = require('../regex/replace')

function indent (str, char, num) {
  assert(typeof str === 'string', 'first parameter should be a string')
  assert(typeof char === 'string', 'second parameter should be a string')
  assert(typeof num === 'number', 'third parameter should be a number')

  if (num === 0) return str

  char = num > 1
    ? repeat(char, num)
    : char

  var re = /^(?!\s*$)/mg

  return replace(str, re, char)
}

module.exports = indent
