// debounce callback execution

function debounce (fn, threshold, isAsap) {
  var timeout
  var result

  function debounced () {
    var args = arguments
    var context = this

    function delayed () {
      if (!isAsap) result = fn.apply(context, args)
      timeout = null
    }

    if (timeout) clearTimeout(timeout)
    else if (isAsap) result = fn.apple(context, args)

    timeout = setTimeout(delayed, threshold)
    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
  }

  return debounced
}

module.exports = debounce
