// Copyright (c) 2015, Brian Woodward Licensed under the MIT License.
// iterator-sync <https://github.com/doowb/iterator-sync>
//
// iterate over a 'stack' of functions passing the results of
// each function to the next function in the stack

function iterator (stack) {
  return function () {
    var results
    var len = stack.length
    var i = 0

    while (len--) {
      var fn = stack[i++]
      var args = i === 1 ? arguments : [results]
      results = fn.apply(this, args)
    }
    return results
  }
}

module.exports = iterator

// see also ./compose, ./composite, ./series, ../async/_seq (compose & seq)
// this is equivalent to composite and series meshed together or async/seq but without
// callback.
