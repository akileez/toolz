// Calculate the median value of a set of numbers in array.

var quantile = require('./quantile')
var clean = require('./clean')

function median (arr) {
  return quantile(clean(arr), 1, 2)
}

module.exports = median
