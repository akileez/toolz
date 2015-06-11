var iterateParallel = require('./iterateParallel')
var iterateSeries = require('./iterateSeries')

function Filter (eachfn, arr, iterator, callback) {
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

var filter = iterateParallel(Filter)
var filterSeries = iterateSeries(Filter)

module.exports = filter
module.exports.Series = filterSeries
