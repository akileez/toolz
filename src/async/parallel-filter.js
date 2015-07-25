function filter (array, iterator, callback) {
  var results = []
  var i = -1
  var len = array.length

  function done (err, res) {
    results[i] = res ? [array[i]] : []

    if (err) return callback(err, results)
    if (i === len -1) return callback(err, [].concat.apply([], results))
  }

  while (++i < len) {
    iterator(array[i], i, done)
  }
}

module.exports = filter
