function detect (array, iterator, callback) {
  var i = -1
  var len = array.length

  function done (err, res) {
    if (err) {
      callback(err, res)
      callback = noop
      return
    }

    if (res) {
      callback(err, res)
      callback = noop
      return
    }

    if (i === len -1) return callback(err, res)
  }

  function noop () {}

  while (++i < len) {
    iterator(array[i], i, done)
  }
}