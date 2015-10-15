var values = require('../object/values')
var make = require('./make_')
var makeIterator = require('../function/makeIterator_')

// Get minimum value inside collection.

function arrMin (arr, fn, thisObj) {
  if (arr == null || !arr.length) {
    return -Infinity
  }

  if (arr.length && !fn) {
    return Math.min.apply(Math, arr)
  }

  fn = makeIterator(iterator, thisObj)
  var compare = Infinity
  var value
  var temp
  var result

  var i = -1
  var len = arr.length

  while (i++ < len) {
    value = arr[i]
    temp = fn(value, i, arr)

    if (temp < compare) {
      compare = temp
      result = value
    }
  }

  return result
}

function objMin (obj, fn) {
  return arrMin(values(obj), fn)
}

module.exports = make(arrMin, objMin)
