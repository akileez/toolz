var scrub = require('./scrub')

function times (arr) {
  return scrub(arr)
    .reduce(function (prod, item, key) {
      if (key === 0) return prod = item
      return prod *= item
    })
}

module.exports = times
