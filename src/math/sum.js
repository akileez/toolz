var isNumber = require('./isNumber')
var slice = require('../array/sliced')

function sum (arr) {
  arr = Array.isArray(arr) ? arr : slice(arguments)

  return arr
    .filter(function (value) {
      return isNumber(value) && (value != null)
    })
    .reduce(function (sum, item) {
      return sum + item
    })
}

module.exports = sum
