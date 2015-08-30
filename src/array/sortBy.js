var sort = require('./sort')
var makeIterator = require('../function/makeIterator_')

function sortBy (arr, fn, context) {
  fn = makeIterator(fn, context)
  return sort(arr, function (a, b) {
    a = fn(a)
    b = fn(b)
    return (a < b) ? -1 : ((a > b) ? 1 : 0)
  })
}

module.exports = sortBy
