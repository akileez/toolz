var eachOfSeries = require('./eachOfSeries')
var _map = require('../utils/asyncMap')

function reduce (arr, memo, iterator, callback) {
  eachOfSeries(arr, function (x, i, callback) {
    iterator(memo, x, function(err, v) {
      memo = v
      callback(err)
    })
  }, function (err) {
    callback(err || null, memo)
  })
}

function reduceRight (arr, memo, iterator, callback) {
  var reversed = _map(arr, function (x) {
    return x
  }).reverse()
  reduce(reversed, memo, iterator, callback)
}

exports.reduce = reduce
exports.reduceRight = reduceRight
