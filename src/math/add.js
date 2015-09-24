var scrub = require('./scrub')

function add (arr) {
  return scrub(arr)
    .reduce(function (sum, item) {
      return sum + item
    })
}

module.exports = add
