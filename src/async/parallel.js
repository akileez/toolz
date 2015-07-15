function parallel (tasks, cb) {
  var done = false
  var results = []
  var errors = []
  var idx = 0

  function next () {
    var i = idx++
    var fn = tasks[i]

    if (!fn) return
    fn.call(this, callback)

    function callback (err, res) {
      if (done) return
      if (res) results[i] = res
      if (err) errors[i] = err
      if (idx == tasks.length) cb(errors, results)
    }
  }

  // start async functions
  tasks.forEach(function () {
    next.call(this)
  }.bind(this))

  return this
}

module.exports = parallel
