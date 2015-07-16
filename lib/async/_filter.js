var iterateParallel = require('./iterateParallel')
var iterateSeries = require('./iterateSeries')
var iterateLimit = require('./iterateLimit')
var _map = require('../utils/asyncMap')

function _filter (eachfn, arr, iterator, callback) {
  var results = []

  eachfn(arr, function (x, index, callback) {
    iterator(x, function (v) {
      if (v) results.push({index: index, value: x})
      callback()
    })
  }, function () {
    callback(_map(results.sort(function (a, b) {
      return a.index - b.index
    }), function (x) {
      return x.value
    }))
  })
}

function _reject (eachfn, arr, iterator, callback) {
  _filter(eachfn, arr, function (value, cb) {
    iterator(value, function (v) {
      cb(!v)
    })
  }, callback)
}

exports.filter = iterateParallel(_filter)
exports.filterSeries = iterateSeries(_filter)
exports.filterLimit = iterateLimit(_filter)
exports.reject = iterateParallel(_reject)
exports.rejectSeries = iterateSeries(_reject)
exports.rejectLimit = iterateLimit(_reject)
