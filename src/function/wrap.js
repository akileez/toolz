var partial = require('./partial')

// returns the first function passed as an argument to the second
// allowing you to adjust arguments, run code before and after, and
// conditionally execute the original function

function wrap (fn, wrapper) {
  return partial(wrapper, fn)
}

module.exports = wrap
