var iterateParallel = require('./iterateParallel')
var iterateSeries = require('./iterateSeries')

function _concat (eachfn, arr, fn, callback) {
  var result = []
  eachfn(arr, function (x, index, cb) {
    fn(x, function (err, y) {
      result = result.concat(y || [])
      cb(err)
    })
  }, function (err) {
    callback(err, result)
  })
}

exports.concat = iterateParallel(_concat)
exports.concatSeries = iterateSeries(_concat)
