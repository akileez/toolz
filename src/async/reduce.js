var eachOfSeries = require('./eachOfSeries')

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

module.exports = reduce