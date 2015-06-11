var iterateParallel = require('./iterateParallel')
var iterateSeries = require('./iterateSeries')

function Map (eachfn, arr, iterator, callback) {
  callback = _once(callback || noop)
  var results = []
  eachfn(arr, function (value, index, callback) {
    iterator(value, function (err, v) {
      results[index] = v
      callback(err)
    })
  }, function (err) {
    callback(err, results)
  })
}

var map = iterateParallel(Map)
var mapSeries = iterateSeries(Map)

module.exports = map
module.exports.Series = mapSeries
