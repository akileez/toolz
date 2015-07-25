function detect (array, iterator, callback) {
  var i = -1
  var len = array.length

  function done (err, res) {
    if (err) return callback(err, res)
    if (res) return callback(err, res)
    if (i === len -1) return callback(err, res)
  }

  while (++i < len) {
    iterator(array[i], i, done)
  }
}