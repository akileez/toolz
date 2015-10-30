var repeat  = require('../string/repeat')
var replace = require('../regex/replace')
var assert  = require('assert')

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
