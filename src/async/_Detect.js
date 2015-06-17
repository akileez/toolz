var iterateParallel = require('./iterateParallel')
var iterateSeries = require('./iterateSeries')

function _detect (eachfn, arr, iterator, main_callback) {
  eachfn(arr, function (x, index, callback) {
    iterator(x, function (result) {
      if (result) {
        main_callback(x)
        main_callback = noop
      } else callback()
    })
  }, function () {
    main_callback()
  })
}

exports.detect = iterateParallel(_detect)
exports.detectSeries = iterateSeries(_detect)
