var map = require('./_Map')
var _map = require('../base/asyncMap')

function sortBy (arr, iterator, callback) {
  map(arr, function (x, callback) {
    iterator(x, function (err, criteria) {
      if (err) callback(err)
      else callback(null, {value: x, criteria: criteria})
    })
  }, function (err, results) {
    if (err) return callback(err)
    else callback(null, _map(results.sort(comparator), function (x) {
      return x.value
    }))
  })
}

function comparator (left, right) {
  var a = left.criteria
  var b = right.criteria
  return a < b ? -1 : a > b ? 1 : 0
}

module.exports = sortBy
