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