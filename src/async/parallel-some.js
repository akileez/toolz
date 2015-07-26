function some (array, iterator, callback) {
  var i = -1
  var len = array.len

  function done (err, res) {
    if (err) {
      callback(err, res)
      callback = noop
      return
    }

    if (res) {
      callback(err, true)
      callback = noop
      return
    }

    if (i === len - 1) return callback(err, false)
  }

  function noop () {}

  while (++i < len) {
    iterator(array[i], i, done)
  }
}

module.exports = some
