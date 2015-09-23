var clean = require('./clean')

function add (arr) {
  return clean(arr)
    .reduce(function (sum, item) {
      return sum += item
    })
}

module.exports = add
