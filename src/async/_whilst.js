var _baseSlice = require('../utils/asyncBaseSlice')

function whilst (test, iterator, callback) {
  if (test) {
    iterator(function (err) {
      if (err) return callback(err)
      whilst(test, iterator, callback)
    })
  } else callback(null)
}

function doWhilst (iterator, test, callback) {
  iterator(function (err) {
    if (err) return callback(err)
    var args = _baseSlice(arguments, 1)
    if (test.apply(null, args)) doWhilst(iterator, test, callback)
    else callback(null)
  })
}

exports.whilst = whilst
exports.doWhilst = doWhilst
