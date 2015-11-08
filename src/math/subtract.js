var scrub = require('./scrub')
var slice = require('../array/slice')
var reduce = require('../array/reduce')

function sub (arr) {
  arr = Array.isArray(arr) ? arr : slice(arguments)

  return reduce(scrub(arr), function (diff, item, key) {
    if (key === 0) return item
    return diff - item
  }, 0)
}

module.exports = sub
