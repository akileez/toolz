var makeIterator = require('../function/makeIterator_')
var append = require('./append')

function collect (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var results = []
  if (arr == null) return results

  var i = -1
  var len = arr.length
  while (++i < len) {
    var value = fn(arr[i], i, arr)
    if (value != null) append(results, value)
  }
  return results
}

module.exports = collect
