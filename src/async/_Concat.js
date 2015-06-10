var iterateParallel = require('./iterateParallel')
var iterateSeries = require('./iterateSeries')

function Concat (eachfn, arr, fn, callback) {
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

var concat = iterateParallel(Concat)
var concatSeries = iterateSeries(Concat)

module.exports = concat
module.exports.concatSeries = concatSeries