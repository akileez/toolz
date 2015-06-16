var _baseSlice = require('../base/asyncBaseSlice')
var eachOf = require('./eachOf')
var eachOfSeries = require('./eachOfSeries')

function _applyEach (eachfn, fns /* args ... */) {
  function go () {
    var that = this
    var args = _baseSlice(arguments)
    var callback = args.pop()
    return eachfn(fns, function (fn, _, cb) {
      fn.apply(that, args.concat([cb]))
    }, callback)
  }
  if (arguments.length > 2) {
    var args = _baseSlice(arguments, 2)
    return go.apply(this, args)
  } else return go
}

function applyEach (/* fns, args ... */) {
  var args = _baseSlice(arguments)
  return _applyEach.apply(null, [eachOf].concat(args))
}

function applyEachSeries (/* fns, args ... */) {
  var args = _baseSlice(arguments)
  return _applyEach.apply(null, [eachOfSeries].concat(args))
}

module.exports = applyEach
module.exports.Series = applyEachSeries
