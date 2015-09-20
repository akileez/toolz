// Calculate the median value of a set of numbers in array.

var quantile = require('./quantile')

function median (arr) {
  return quantile(arr, 1, 2)
}

module.exports = median
