var asyncIterator = require('./iterator')
var ensureAsync = require('./ensureAsync')
var _baseSlice = require('../utils/asyncBaseSlice')
var isArray = require('../lang/isArray')
var _once = require('../utils/asyncOnce')
var noop = require('../base/noop')

function waterfall (tasks, callback) {
  callback = _once(callback || noop)
  if (!isArray(tasks)) {
    var err = new Error('First argument to waterfall must be an array of functions')
    return callback(err)
  }
  if (!tasks.length) return callback(err)

  function wrapIterator(iterator) {
    return function (err) {
      if (err) callback.apply(null, arguments)
      else {
        var args = _baseSlice(arguments, 1)
        var next = iterator.next()
        if (next) args.push(wrapIterator(next))
        else args.push(callback)
      }
      ensureAsync(iterator).apply(null, args)
    }
  }
  wrapIterator(asyncIterator(tasks))()
}

module.exports = waterfall