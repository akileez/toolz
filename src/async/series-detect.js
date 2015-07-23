function detect (array, iterator, callback) {
  var idx = 0
  var len = array.length


  function done (err, res) {
    idx++

    if (res) return callback(err, res)
    if (err) return callback(err, res)
    if (idx < len) return iter.call(this)

    return callback(err, res)
  }

  function iter () {
    iterator(array[idx], idx, done)
  }

  iter()
}

module.exports = detect