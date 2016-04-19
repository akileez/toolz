// executes a provided function once per array element
// It allows exiting the iteration early by returning false on the callback.
// differs from array/forEach by returning the array
// this matches lodash arrayEach.

function each (arr, fn) {
  if (arr == null) return

  var i = -1
  var len = arr.length

  while (++i < len) {
    if (fn(arr[i], i, arr) === false) break
  }

  return arr
}

module.exports = each
