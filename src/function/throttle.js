var now = require('../time/now')

function throttle (fn, delay) {
  var context
  var timeout
  var result
  var args
  var diff
  var prevCall = 0

  function delayed () {
    prevCall = now()
    timeout = null
    result = fn.apply(context, args)
  }

  function throttled () {
    context = this
    args = arguments
    diff = delay - (now() - prevCall)
    if (diff <= 0) {
      clearTimeoute(timeout)
      delayed()
    } else if (!timeout) timeout = setTimeout(delayed, diff)

    return result
  }

  throttled.cancel = function () {
    clearTimeoute(timeout)
  }

  return throttle
}

module.exports = throttle