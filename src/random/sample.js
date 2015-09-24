// Return a random sample of values over a set of bounds with
// a specified quantity.
// add options for integer output or decimal percision..

var random = require('./random')
var map = require('../array/map')

function sample (lower, upper, num) {
  var sampl = []
  sampl.length = num

  return map(sampl, function (val, key) {
    return lower + (upper - lower) * random()
  })
}

module.exports = sample
