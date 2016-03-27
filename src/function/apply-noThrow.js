var fastApply = require('./apply')
// concept adopted from: https://github.com/wilmoore/apply-or.js
// reasoning: Function.prototype.apply is normally sufficient; however, there are situations where it is useful to treat a value as a Function (invoke it) only if it is indeed a Function; otherwise, return it as-is. Calling .apply on a value that is not a function would cause an error.

// add type check for `function` to prevent errors by using identity
function fastApplyNoThrow (fn, context, args) {
  fn = (typeof fn !== 'function')
    ? identity
    : fn

  return fastApply(fn, context, args)
}

function identity (value) {
  return value
}

module.exports = fastApplyNoThrow
