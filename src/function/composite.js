/**
 * Creates a function that returns the result of invoking the provided functions
 * with the 'this' binding of the created function, where each successive invocation
 * is supplied the return value of the previous.
 *
 * This is a combination of mout.js function/series and function/compose methods.
 * I wanted a series of functions run in the order specified (left to right) with the ability to
 * pass arguments. Logically, this works better for me. Comparable to lodash "flow".
 * compose would be comparable to lodash "flowRight"
**/

function composite () {
  var fns = arguments
  return function (arg) {
    // only cares about the first argument since the chain can only
    // deal with a single return value anyway. It should start from
    // the first fn.
    var i = -1
    var n = fns.length
    while (++i < n) {
      arg = fns[i].call(this, arg)
    }
    return arg
  }
}

module.exports = composite
