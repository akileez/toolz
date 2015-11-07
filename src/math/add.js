var scrub = require('toolz/src/math/scrub')
var slice = require('toolz/src/array/slice')
var reduce = require('toolz/src/array/reduce')

function add (arr) {
  arr = Array.isArray(arr) ? arr : slice(arguments)

  return reduce(scrub(arr), function (sum, item) {
    return sum + item
  })
}

module.exports = add
