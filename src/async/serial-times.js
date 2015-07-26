function times (num, iterator, callback) {
  var i = 0
  var results = []

  function done (err, res) {
    results[i] = res
    i++

    if (err) {
      callback(err, results)
      callback = noop
      return
    }

    if (i === num) return callback(err, results)

    iter()
  }

  function noop () {}

  function iter () {
    iterator(i, done)
  }

  iter()
}

module.exports = times
