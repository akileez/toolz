// Maps the items in arr and concatenates the resulting arrays
// this allow for the shorthand syntax through makeIterator.

var append = require('../array/append')
var makeIterator = require('../function/makeIterator_')

function collect (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)

  var result = []
  if (arr == null) return result

  var val
  var i = -1
  var len = arr.length

  while (++i < len) {
    val = fn(arr[i], i, arr)
    if (val != null) append(result, val)
  }
  return result
}

module.exports = collect
