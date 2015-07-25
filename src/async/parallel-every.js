function every (array, iterator, callback) {
  var i = -1
  var len = array.len

  function done (err, res) {
    if (err) return callback(err, res)
    if (res) return callback(err, false)
    if (i === len -1) return callback(err, true)
  }

  while (++i < len) {
    iterator(array[i], i, done)
  }
}

module.exports = every
