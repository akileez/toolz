// Builds a new array based on the returned values
// from the given callback

function take (n, fn, thisObj) {
  var i = -1
  var arr = []
  if (!thisObj) {
    while (++i < n) {
      arr[i] = fn(i, n)
    }
  } else {
    while (++i < n) {
      arr[i] = fn.call(thisObj, i, n)
    }
  }
  return arr
}

module.exports = take
