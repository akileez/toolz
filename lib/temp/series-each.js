function each (arr, iterator, callback) {
  var i = 0
  var len = arr.length
  var results = []

  function done (err, res) {
    results[i] = res
    i++

    if (err) {
      callback(err, results)
      callback = noop
      return
    }

    if (i === len) return callback(err, results)

    return iter.call(this)
  }

  function noop () {}

  function iter () {
    iterator(arr[i], i, done)
  }

  iter()
}

module.exports = each
