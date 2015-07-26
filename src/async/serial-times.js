function times (num, iterator, callback) {
  var i = 0
  var results = []

  function done (err, res) {
    results[i] = res
    i++

    if (err) return callback(err, results)
    if (i === num) return callback(err, results)

    iter()
  }

  function iter () {
    iterator(i, done)
  }

  iter()
}

module.exports = times
