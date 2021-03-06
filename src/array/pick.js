var slice = require('./slice')
var randInt = require('../random/randInt')

/**
    var arr = [1,2,3,4,5,6,7,8]
    pick.first(arr)     // [ 1 ]
    pick.first(arr, 3)  // [ 1, 2, 3 ]
    pick.last(arr)      // [ 8 ]
    pick.last(arr, 3)   // [ 6, 7, 8 ]
    pick.before(arr, 4) // [ 1, 2, 3, 4 ]
    pick.after(arr, 3)  // [ 4, 5, 6, 7, 8 ]
    pick.between(arr, 1, 3) // [ 2, 3 ]
    pick.rand(arr)      // [ 4 ]
    pick.rand(arr, 3)   // [ 8, 3, 6 ]
*/

// Returns the first item, or first `num` items of an array.
function first (arr, num) {
  return slice(arr, 0, num || 1)
}

// Returns the last item, or last `num` items of an array.
function last (arr, num) {
  return slice(arr, -num || arr.length - 1)
}

// Removes the last item or last `num` items before the end of an array
function before (arr, num) {
  return slice(arr, 0, -num || arr.length - 1)
}

// Removes the first item or first `num` items after the start of an array
function after (arr, num) {
  return slice(arr, num || 1)
}

// Returns array between start and end indices
function between (arr, strt, end) {
  return slice(arr, strt || 0, end || arr.length - 1)
}

// Returns a random item or `num` items from an array
function rand (arr, num) {
  if (num != null) {
    var result = []
    if (num > 0 && arr && arr.length) {
      num = num > arr.length ? arr.length : num
      while (num--) {
        result.push(pickOne(arr))
      }
    }
    return result
  }
  return (arr && arr.length) ? [pickOne(arr)] : void (0)
}

function pickOne (arr) {
  var idx = randInt(0, arr.length - 1)
  // dont mutate array
  return arr[idx]
}

exports.first   = first
exports.take    = first   // lodash alias
exports.last    = last
exports.before  = before
exports.initial = before  // lodash alias
exports.after   = after
exports.rest    = after   // lodash alias
exports.between = between
exports.rand    = rand
