function reject (array, iterator, callback) {
  var results = []
  var i = -1
  var len = array.length

  function done (err, res) {
    results[i] = res ? [] : [array[i]]

    if (err) {
      callback(err, results)
      callback = noop
      return
    }

    if (i === len -1) return callback(err, [].concat.apply([], results))
  }

  function noop () {}

  while (++i < len) {
    iterator(array[i], i, done)
  }
}

module.exports = reject
