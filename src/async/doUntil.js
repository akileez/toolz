var _baseSlice = require('../base/asyncBaseSlice')

function doUntil (iterator, test, callback) {
  iterator (function (err) {
    if (err) return callback(err)

    var args = _baseSlice(arguments, 1)
    if (!test.apply(null, args)) doUntil(iterator, test, callback)
    else callback(null)
  })
}

module.exports = doUntil
