// Find the maximum value in an array
// array scrubbed for numbers only (Math focus)
// optional iterator to perform operations

var makeIterator = require('../function/makeIterator_')
var scrub = require('./scrub')

function maxd (arr, iterator, thisObj) {
  arr = scrub(arr)

  if (arr == null || !arr.length) {
    return Infinity
  }

  if (arr.length && !iterator) {
    return Math.max.apply(Math, arr)
  }

  iterator = makeIterator(iterator, thisObj)

  var max = -Infinity
  var val
  var tmp
  var res

  var i = -1
  var len = arr.length

  while (i++ < len) {
    val = arr[i]
    tmp = iterator(val, i, arr)

    if (tmp > max) {
      max = tmp
      res = val
    }
  }

  return res
}

module.exports = maxd
