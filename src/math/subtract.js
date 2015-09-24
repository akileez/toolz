var scrub = require('./scrub')

function sub (arr) {
  return scrub(arr)
    .reduce(function (diff, item, key) {
      if (key === 0) return diff = item
      return diff -= item
    })
}

module.exports = sub
