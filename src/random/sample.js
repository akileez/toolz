// Return a random sample of values over a set of bounds with
// a specified quantity.

var rand = require('./rand')
var randInt = require('./randInt')
var map = require('../array/map')
var precise = require('../number/enforcePrecision')

function sampleNumbers (lower, upper, num) {
  var sample = []
  sample.length = num

  return map(sample, function (val, key) {
    return rand(lower, upper)
  })
}

function samplePrecision (lower, upper, num, precision) {
  var sample = []
  sample.length = num

  return map(sample, function (val, key) {
    return precise(rand(lower, upper), precision || 3)
  })
}

function sampleIntegers (lower, upper, num) {
  var sample = []
  sample.length = num

  return map(sample, function (val, key) {
    return randInt(lower, upper)
  })
}

module.exports = sampleNumbers
module.exports.int = sampleIntegers
module.exports.precise = samplePrecision
