var clean = require('./clean')

function sub (arr) {
  return clean(arr)
    .reduce(function (diff, item, key) {
      if (key === 0) return diff = item
      return diff -= item
    })
}

module.exports = sub
