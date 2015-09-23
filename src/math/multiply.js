var clean = require('./clean')

function times (arr) {
  return clean(arr)
    .reduce(function (prod, item, key) {
      if (key === 0) return prod = item
      return prod *= item
    })
}

module.exports = times
