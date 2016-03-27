var hasOwn   = require('./hasOwn')
var every    = require('../collection/every')
var isObject = require('../lang/isObject')
var is       = require('../lang/is')

// makes a function to compare the object values from the specified
// compare operation callback

function makeCompare (fn) {
  return function (value, key) {
    return hasOwn(this, key) && fn(value, this[key])
  }
}

function checkProperties (value, key) {
  return hasOwn(this, key)
}

// checks if two objects have the same keys and values

function equals (a, b, fn) {
  fn = fn || is
  if (!isObject(a) || !isObject(b)) return fn(a, b)

  return (every(a, makeCompare(fn), b) && every(b, checkProperties, a))
}

module.exports = equals
