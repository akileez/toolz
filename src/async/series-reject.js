function reject (array, iterator, callback) {
  var idx = 0
  var len = array.length
  var results = []

  function done (err, res) {
    var i = idx++
    if (!res) results.push(array[i])

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
    iterator(array[idx], idx, done)
  }

  iter()
}

module.exports = reject