var makeIterator = require('../function/makeIterator_')
var scrub = require('./scrub')

function mindy (arr, iterator, thisObj) {
  arr = scrub(arr)

  if (arr == null || !arr.length) {
    return -Infinity
  }

  if (arr.length && !iterator) {
    return Math.min.apply(Math, arr)
  }

  iterator = makeIterator(iterator, thisObj)

  var min = Infinity
  var val
  var tmp
  var res

  var i = -1
  var len = arr.length

  while (i++ < len) {
    val = arr[i]
    tmp = iterator(val, i, arr)

    if (tmp < min) {
      min = tmp
      res = val
    }
  }

  return res
}

module.exports = mindy
