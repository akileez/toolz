var _baseSlice = require('../utils/asyncBaseSlice')
var noop = require('../base/noop')
var reduce = require('./_reduce').reduce

function seq (/* functions ... */) {
  var fns = arguments
  return function () {
    var that = this
    var args = _baseSlice(arguments)

    var callback = args.slice(-1)[0]
    if (typeof callback === 'function') args.pop()
    else callback = noop

    reduce(fns, args, function (newargs, fn, cb) {
      fn.apply(that, newargs.concat([function () {
        var err = arguments[0]
        var nextargs = _baseSlice(arguments, 1)
        cb(err, nextargs)
      }]))
    }, function (err, results) {
      callback.apply(that, [err].concat(results))
    })
  }
}

function compose (/* functions ... */) {
  return seq.apply(null, Array.prototype.reverse.call(arguments))
}

exports.seq = seq
exports.compose = compose
