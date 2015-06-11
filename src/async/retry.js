var series = require('./series')

function retry (times, task, callback) {
  var DEFAULT_TIMES = 5
  var attempts = []
  // use defaults if times not passed
  if (typeof times === 'function') {
    callback = task
    task = times
    times = DEFAULT_TIMES
  }
  // Make sure times is a number
  times = parseInt(times, 10) || DEFAULT_TIMES

  function wrappedTask (wrappedCallback, wrappedResults) {
    function retryAttempt (task, finalAttempt) {
      return function (seriesCallback) {
        task(function (err, result) {
          seriesCallback(!err || finalAttempt, {err: err, result: result})
        }, wrappedResults)
      }
    }
    while (times) {
      attempts.push(retryAttempt(task, !(times -= 1)))
    }
    series(attempts, function (done, data) {
      data = data[data.length - 1]
      (wrappedCallback || callback)(data.err, data.result)
    })
  }
  // if a callback is passed, run this as a control flow
  return callback ? wrappedTask() : wrappedTask
}

module.exports = retry
