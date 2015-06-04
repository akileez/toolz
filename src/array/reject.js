var makeIterator = require('../function/makeIterator_')

function reject (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var results = []
  if (arr == null) return results

  var i = -1
  var len = arr.length
  var value
  while (++i < len) {
    value = arr[i]
    if (!fn(value, i, arr)) results.push(value)
  }
  return results
}

module.exports = reject