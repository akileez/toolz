// Return a random sample of values over a set of bounds with
// a specified quantity.

var rand = require('./rand')
var randInt = require('./randInt')
var map = require('../array/map')
var precise = require('../number/enforcePrecision')
var isNumber = require('../number/isNumber')
var isBoolean = require('../lang/isBoolean')

function sample (lower, upper, num, precision) {
  var sample = []
  sample.length = num

  if (isNumber(precision)) {
    // a number will generate decimal precision
    return map(sample, function () {
      return precise(rand(lower, upper), precision)
    })
  } else if (isBoolean(precision)) {
    // true or false will generate a set of integers
    return map(sample, function () {
      return randInt(lower, upper)
    })
  } else {
    // undefined or any other type generates normal set
    return map(sample, function () {
      return rand(lower, upper)
    })
  }
}


module.exports = sample
