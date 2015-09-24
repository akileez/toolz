// Calculate the median value of a set of numbers in array.

var quantile = require('./quantile')
var scrub = require('./scrub')

function median (arr) {
  return quantile(scrub(arr), 1, 2)
}

module.exports = median
