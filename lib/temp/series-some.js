function some (array, iterator, callback) {
  var idx = 0
  var len = array.length

  function done (err, res) {
    idx++

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

    if (idx < len) return iter.call(this)

    return callback(err, false)
  }

  function noop () {}

  function iter () {
    iterator(array[idx], idx, done)
  }

  iter()
}

module.exports = some
