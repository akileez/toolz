var slice = require('./sliced')

/**
 *  var arr = [1,2,3,4,5,6,7,8]
 *
 *  pick.first(arr)     // [ 0 ]
 *  pick.first(arr, 3)  // [ 1, 2, 3 ]
 *  pick.last(arr)      // [ 8 ]
 *  pick.last(arr, 3)   // [ 6, 7, 8 ]
 *  pick.before(arr, 4) // [ 1, 2, 3, 4 ]
 *  pick.after(arr, 3)  // [ 4, 5, 6, 7, 8 ]
 */

// Returns the first item, or first `n` items of an array.
function first (arr, num) {
  return slice(arr, 0, num || 1)
}

// Returns the last item, or lsat `n` items of an array.
function last (arr, num) {
  return slice(arr, -num || arr.length -1)
}

// Removes the last item or last `n` items before the end of an array
function before (arr, num) {
  return slice(arr, 0, -num || arr.length -1)
}

// Removes the first item or first `n` items after the start of an array
function after (arr, num) {
  return slice(arr, num || 1)
}

exports.first = first
exports.last = last
exports.before = before
exports.after = after
