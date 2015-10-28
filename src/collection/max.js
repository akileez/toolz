var values = require('../object/values')
var make = require('./_make')
var makeIterator = require('../function/makeIterator_')

// Get maximum value inside collection

function arrMax (arr, fn, thisObj) {
  if (arr == null || !arr.length) {
    return Infinity
  }

  if (arr.length && !fn) {
    return Math.max.apply(Math, arr)
  }

  fn = makeIterator(fn, thisObj)
  var compare = -Infinity
  var value
  var temp
  var result

  var i = -1
  var len = arr.length

  while (i++ < len) {
    value = arr[i]
    temp = fn(value, i, arr)

    if (temp > compare) {
      compare = temp
      result = value
    }
  }

  return result
}

function objMax (obj, fn) {
  return arrMax(values(obj), fn)
}

module.exports = make(arrMax, objMax)
