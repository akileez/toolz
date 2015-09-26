var makeIterator = require('../function/makeIterator_')

function max (arr, iterator, thisObj) {
  if (arr == null || !arr.length) {
    return Infinity
  }

  if (arr.length && !iterator) {
    return Math.max.apply(Math, arr)
  }

  iterator = makeIterator(iterator, thisObj)

  var compare = -Infinity
  var value
  var temp
  var result

  var i = -1
  var len = arr.length

  while (i++ < len) {
    value = arr[i]
    temp = iterator(value, i, arr)

    if (temp > compare) {
      compare = temp
      result = value
    }
  }

  return result
}

module.exports = max
