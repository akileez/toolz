function whilst (test, iterator, callback) {
  function done (err) {
    if (err) return callback(err)
    iter()
  }

  function iter () {
    if (test()) return iterator(done)
    callback()
  }

  iter()
}

module.exports = whilst