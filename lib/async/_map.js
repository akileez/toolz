var iterateParallel = require('./iterateParallel')
var iterateSeries = require('./iterateSeries')
var iterateLimit = require('./iterateLimit')
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

exports.map = iterateParallel(_map)
exports.mapSeries = iterateSeries(_map)
exports.mapLimit = iterateLimit(_map)
