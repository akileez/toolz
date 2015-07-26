function map (arr, iterator, callback) {
  var idx = 0
  var len = arr.length
  var results = []

  function done (err, res) {
    var i = idx++
    results[i] = res

    if (err) {
      callback(err, results)
      callback = noop
      return
    }

    if (idx < len) return iter.call(this)

    return callback(err, results)
  }

  function noop () {}

  function iter () {
    iterator(arr[idx], idx, done)
  }

  iter()
}

module.exports = map
