// Checks if both arrays are equal

var isArray = require('../lang/isArray')
var is      = require('../lang/is')
var every   = require('./every')

function equals (a, b, fn) {
  fn = fn || is
  if (!isArray(a) || !isArray(b)) return fn(a, b)
  if (a.length !== b.length) return false
  return every(a, makeCompare(fn), b)
}

function makeCompare (fn) {
  return function (value, i) {
    return i in this && fn(value, this[i])
  }
}

module.exports = equals
