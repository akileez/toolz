var isNumber = require('toolz/src/number/isFinite')
var slice = require('toolz/src/array/slice')
var filter = require('toolz/src/array/filter')
var reduce = require('toolz/src/array/reduce')

function sum (arr) {
  arr = Array.isArray(arr) ? arr : slice(arguments)

  return reduce(filter(arr, function (value) {
      return isNumber(value)
    }), function (sum, item) {
    return sum + item
  }, 0)
}

module.exports = sum
