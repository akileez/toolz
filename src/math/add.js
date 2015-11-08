var scrub = require('./scrub')
var slice = require('../array/slice')
var reduce = require('../array/reduce')

function add (arr) {
  arr = Array.isArray(arr) ? arr : slice(arguments)

  return reduce(scrub(arr), function (sum, item) {
    return sum + item
  })
}

module.exports = add
