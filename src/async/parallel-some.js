function some (array, iterator, callback) {
  var i = -1
  var len = array.len

  function done (err, res) {
    if (err) return callback(err, res)
    if (res) return callback(err, true)
    if (i === len -1) return callback(err, false)
  }

  while (++i < len) {
    iterator(array[i], i, done)
  }
}

module.exports = some
