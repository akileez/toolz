function each (array, iterator, callback) {
  var i = -1
  var len = array.length
  var results = []

  function done (err, res) {
    results[i] = res
    if (err) return callback(err, results)
    if (i === len - 1) return callback(err, results)
  }

  while (++i < len) {
    iterator(array[i], i, done)
  }
}

module.exports = each
