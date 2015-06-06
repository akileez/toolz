var makeIterator = require('../function/makeIterator_')

function filter (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var results = []
  if (arr == null) return results
  var iter = -1
  var len = arr.length
  var value
  while (++iter < len) {
    if (fn(value, iter, arr)) results.push(value)
  }
  return results
}

module.exports = filter
