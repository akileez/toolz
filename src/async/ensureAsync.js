var _baseSlice = require('../base/asyncBaseSlice')
var setImmediate = process.nextTick

function ensureAsync (fn) {
  return function(/*...args, callback*/) {
    var args = _baseSlice(arguments)
    var callback = args.pop()
    args.push(function () {
      var innerArgs = arguments
      if (sync) {
        setImmediate(function () {
          callback.apply(null, innerArgs)
        })
      } else callback.apply(null, innerArgs)
    })
    var sync = true
    fn.apply(this, args)
    sync = false
  }
}

module.exports = ensureAsync
