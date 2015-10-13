var make = require('./make_')
var makeIterator = require('../function/makeIterator_')

function arrEvery (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)

  var result = true
  if (arr == null) return result

  var i = -1
  var len = arr.length

  while (++i < len) {
    if (!fn(arr[i], i, arr)) {
      result = false
      break
    }
  }
  return result
}

function objEvery (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)

  var result = true
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (!fn(obj[key], key, obj)) {
        result = false
        break
      }
    }
  }
  return result
}

module.exports = make(arrEvery, objEvery)
