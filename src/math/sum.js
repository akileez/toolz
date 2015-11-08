var isNumber = require('../number/isFinite')
var slice = require('../array/slice')
var filter = require('../array/filter')
var reduce = require('../array/reduce')

function sum (arr) {
  arr = Array.isArray(arr) ? arr : slice(arguments)

  return reduce(filter(arr, function (value) {
      return isNumber(value)
    }), function (sum, item) {
    return sum + item
  }, 0)
}

module.exports = sum
