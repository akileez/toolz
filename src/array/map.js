// Creates a new array with the results of calling a provided function
// on every element in this array. specialized version or arrays
// without support for callback shorthands and "this" binding

function map (arr, fn) {
  var results = []
  if (arr == null) return results

  var i = -1
  var len = arr.length

  while (++i < len) {
    results[i] = fn(arr[i], i, arr)
  }
  return results
}

module.exports = map
