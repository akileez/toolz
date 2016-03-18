var make = require('./_make')
var makeIterator = require('../function/makeIterator_')
var hasOwn = require('../object/hasOwn')

function arrSome (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var result = false
  var i = -1
  var len = arr.length

  while (++i < len) {
    if (fn(arr[i], i, arr)) {
      result = true
      break
    }
  }

  return result
}

function objSome (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var result = false
  var key

  for (key in obj) {
    if (hasOwn(obj, key)) {
      if (fn(obj[key], key, obj)) {
        result = true
        break
      }
    }
  }
  return result
}

module.exports = make(arrSome, objSome)
