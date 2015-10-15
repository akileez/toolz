var make = require('./make_')
var makeIterator = require('../function/makeIterator_')

function arrSome (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var i = -1
  var len = arr.length

  while (++i < len) {
    if (fn(arr[i], i, arr)) return true
  }

  return false
}

function objSome (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var result = false
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (fn(obj[key], key, obj)) {
        result = true
        break
      }
    }
  }
  return result
}

module.exports = make(arrSome, objSome)