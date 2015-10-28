var make = require('./_make')
var makeIterator = require('../function/makeIterator_')

function arrReject (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var result = []
  if (arr == null) return result

  var i = -1
  var len = arr.length
  var val

  while (++i < len) {
    val = arr[i]
    if (!fn(val, i, arr)) result.push(val)
  }

  return result
}

function objReject (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var result = {}
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (!fn(obj[key], key, obj)) result[key] = obj[key]
    }
  }
  return result
}

module.exports = make(arrReject, objReject)
