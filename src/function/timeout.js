var slice = require('../array/slice')

// delays the call of a function within a given context

function timeout (fn, ms, context) {
  var args = slice(arguments, 3)
  return setTimeout(function () {
    fn.apply(context, args)
  }, ms)
}

module.exports = timeout
