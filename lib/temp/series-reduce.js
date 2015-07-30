function reduce (array, memo, iterator, callback) {
  var idx = 0
  var len = array.length

  function done (err, result) {
    idx++
    memo = result

    if (err) {
      callback(err, result)
      callback = noop
      return
    }

    if (idx < len) return iter.call(this)

    return callback(err, result)
  }

  function noop () {}

  function iter () {
    iterator(memo, array[idx], idx, done)
  }

  iter()
}

module.exports = reduce
