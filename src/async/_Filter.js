var iterateParallel = require('./iterateParallel')
var iterateSeries = require('./iterateSeries')
var _map = require('../base/asyncMap')

function _filter (eachfn, arr, iterator, callback) {
  var results = []
  arr = _map(arr, function (x, i) {
    return {index: i, value: x}
  })
  eachfn(arr, function (x, index, callback) {
    iterator(x.value, function (v) {
      if (v) results.push(x)
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

var filter = iterateParallel(_filter)
var filterSeries = iterateSeries(_filter)

module.exports = filter
module.exports.Series = filterSeries
