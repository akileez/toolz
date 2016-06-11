// Return a random sample of values over a set of bounds with
// a specified quantity.

var rand      = require('./rand')
var map       = require('../array/map')
var randInt   = require('./randInt')
var isFinite  = require('../number/isFinite')
var isBoolean = require('../lang/isBoolean')
var precise   = require('../number/enforcePrecision')
var assert    = require('assert')

function sample (lower, upper, size, precision) {
  assert(isFinite(lower), 'Expects lower bound to be a number')
  assert(isFinite(upper), 'Expects upper bound to be a number')
  assert(isFinite(size), 'Expects sample size to be a number')

  var sample = []
  sample.length = size

  if (isFinite(precision)) {
    // a number will generate decimal precision
    return map(sample, () => precise(rand(lower, upper), precision))
  } else if (isBoolean(precision)) {
    // true or false will generate a set of integers
    return map(sample, () => randInt(lower, upper))
  } else {
    // undefined or any other type generates normal set
    return map(sample, () => rand(lower, upper))
  }
}

module.exports = sample
