var _baseSlice = require('../utils/asyncBaseSlice')

function until (test, iterator, callback) {
  if (!test) {
    iterator(function (err) {
      if (err) return callback(err)
      until(test, iterator, callback)
    })
  } else callback(null)
}

function doUntil (iterator, test, callback) {
  iterator (function (err) {
    if (err) return callback(err)

    var args = _baseSlice(arguments, 1)
    if (!test.apply(null, args)) doUntil(iterator, test, callback)
    else callback(null)
  })
}

exports.until = until
exports.doUntil = doUntil
