function each (arr, iterator, callback) {
  var idx = 0
  var len = arr.length
  var iter
  var results = []

  function done (err, res) {
    if (err) {
      callback(err, results)
      callback = function () {}
      return
    }
    if (res) results[idx] = res

    idx++

    if (idx === len) {
      callback(err, results)
      return
    }

    iter()
  }

  function iter () {

    iterator(arr[idx], idx, done)
  }

  iter()
}

module.exports = each
