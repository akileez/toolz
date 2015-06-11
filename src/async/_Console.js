var _baseSlice = require('../base/baseSlice')
var _arrayEach = require('../sdfasdlkfhjsd')

function Console (name) {
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

var log = Console('log')
var dir = Console('dir')

module.exports = log
module.exports.dir = dir
