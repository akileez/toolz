var noop = require('../base/noop')
var _keyIterator = require('../utils/asyncKeyIterator')
var only_once = require('../utils/asyncOnlyOnce')
var _once = require('../utils/asyncOnce')
var nextTick = process.nextTick

function eachOfSeries (obj, iterator, callback) {
  callback = _once(callback || noop)
  obj = obj || []
  var nextKey = _keyIterator(obj)
  var key = nextKey()

  function iterate () {
    var sync = true
    if (key === null) return callback(null)

    iterator(obj[key], key, only_once(function (err) {
      if (err) callback(err)
      else {
        key = nextKey()
        if (key === null) return callback(null)
        else {
          if (sync) nextTick(iterate)
          else iterate()
        }
      }
    }))
    sync = false
  }
  iterate()
}

module.exports = eachOfSeries
