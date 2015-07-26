function times (num, iterator, callback) {
  var i = -1
  var results = []

  function done (err, res) {
    results[i] = res
    if (err) return callback(err, results)
    if (i == num - 1) return callback(err, results)
  }

  while (++i < num) {
    iterator(i, done)
  }
}