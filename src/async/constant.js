var rest = require('../function/rest')

module.exports = rest(function (values) {
  var args = [null].concat(values)
  return function (callback) {
    return callback.apply(this, args)
  }
})
