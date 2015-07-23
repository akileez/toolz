function each (arr, iterator, callback) {
  var idx = 0
  var len = arr.length
  var results = []

  function done (err, res) {
    var i = idx++

    if (err) return callback(err, results)
    if (res) results[i] = res
    if (idx < len) return iter.call(this)

    return callback(err, results)
  }

  function iter () {
    iterator(arr[idx], idx, done)
  }

  iter()
}

module.exports = each
