var _baseSlice = require('../utils/asyncBaseSlice')

function doWhilst (iterator, test, callback) {
  iterator(function (err) {
    if (err) return callback(err)
    var args = _baseSlice(arguments, 1)
    if (test.apply(null, args)) doWhilst(iterator, test, callback)
    else callback(null)
  })
}

module.exports = doWhilst
