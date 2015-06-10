var iterateParallel = require('./iterateParallel')
var iterateSeries = require('./iterateSeries')

function Reject (eachfn, arr, iterator, callback) {
  var results = []
  arr = _map(arr, function (x, i) {
    return {index: i, value: x}
  })
  eachfn(arr, function (x, index, callback) {
    iterator(x.value, function (v) {
      if (!v) results.push(x)
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

var reject = iterateParallel(Reject)
var rejectSeries = iterateSeries(Reject)

module.exports = reject
module.exports.rejectSeries = rejectSeries
