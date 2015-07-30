function times (num, iterator, callback) {
  var i = -1
  var results = []

  function done (err, res) {
    results[i] = res

    if (err) {
      callback(err, results)
      callback = noop
      return
    }

    if (i == num - 1) return callback(err, results)
  }

  function noop () {}

  while (++i < num) {
    iterator(i, done)
  }
}