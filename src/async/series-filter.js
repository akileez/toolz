function filter (array, iterator, callback) {
  var idx = 0
  var len = array.length
  var results = []

  function done (err, res) {
    var i = idx++
    if (res) results.push(array[idx])

    if (err) return callback(err, results)
    if (idx < len) return iter.call(this)

    return callback(err, results)
  }

  function iter () {
    iterator(arr[idx], idx, done)
  }

  iter()
}

module.exports = filter
