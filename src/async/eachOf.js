var noop        = require('../base/noop')
var _once       = require('../utils/asyncOnce')
var _each       = require('../utils/asyncEach')
var only_once   = require('../utils/asyncOnlyOnce')
var isArrayLike = require('../lang/isArrayLike')
var _keys       = require('../utils/asyncKeys')

function eachOf (obj, iterator, callback) {
  callback = _once(callback || noop)
  obj = obj || []
  var size = isArrayLike(obj) ? obj.length : _keys(obj).length
  var completed = 0

  if (!size) return callback(null)

  _each(obj, function (value, key) {
    iterator(obj[key], key, only_once(done))
  })

  function done (err) {
    if (err) callback(err)
    else {
      completed += 1
      if (completed >= size) callback(null)
    }
  }
}

module.exports = eachOf
