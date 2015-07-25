function map (array, iterator, callback) {
  var results = []
  var i = -1
  var len = array.length

  function done (err, res) {
    results[i] = res
    if (err) return callback(err, results)
    if (i === len - 1) return callback(err, results)
  }

  while (++i < len) {
    iterator(array[i], i, done)
  }
}

module.exports = map
