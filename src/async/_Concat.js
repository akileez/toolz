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

var concat = iterateParallel(_concat)
var concatSeries = iterateSeries(_concat)

module.exports = concat
module.exports.Series = concatSeries