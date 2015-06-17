var iterateParallel = require('./iterateParallel')
var iterateSeries = require('./iterateSeries')
var _once = require('../utils/asyncOnce')

function _map (eachfn, arr, iterator, callback) {
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

var map = iterateParallel(_map)
var mapSeries = iterateSeries(_map)

module.exports = map
module.exports.Series = mapSeries
