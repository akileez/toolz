// Return a random sample of values over a set of bounds with
// a specified quantity.
// add options for integer output or decimal percision..

var rand = require('./rand')
var randInt = require('./randInt')
var map = require('../array/map')

function sample (lower, upper, num) {
  var sampl = []
  sampl.length = num

  return map(sampl, function (val, key) {
    return rand(lower, upper)
  })
}

function sampleIntegers (lower, upper, num) {
  var sample = []
  sample.length = num

  return map(sample, function (val, key) {
    return randInt(lower, upper)
  })
}

module.exports = sample
module.exports.int = sampleIntegers
