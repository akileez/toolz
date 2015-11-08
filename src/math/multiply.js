var scrub = require('./scrub')
var slice = require('../array/slice')
var reduce = require('../array/reduce')

function times (arr) {
  return reduce(scrub(arr), function (prod, item, key) {
    if (key === 0) return item
    return prod * item
  })

}

module.exports = times
