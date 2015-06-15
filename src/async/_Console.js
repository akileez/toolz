var _baseSlice = require('../base/asyncBaseSlice')
var _arrayEach = require('../base/asyncArrayEach')

function _console (name) {
  return function (fn) {
    var args = _baseSlice(arguments, 1)
    fn.apply(null, args.concat([function (err) {
      var args = _baseSlice(arguments, 1)
      if (typeof console !== 'undefined') {
        if (err) {
          if (console.error) console.error(err)
        } else if (console[name]) {
          _arrayEach(args, function (x) {
            console[name](x)
          })
        }
      }
    }]))
  }
}

var log = _console('log')
var dir = _console('dir')

module.exports = log
module.exports.dir = dir
