var make = require('./_make')
var makeIterator = require('../function/makeIterator_')

function arrForEach (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  if (arr == null) return

  var i = -1
  var len = arr.length

  while (++i < len) {
    if (fn(arr[i], i, arr) === false) break
  }
}

function objForEach (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn(obj[key], key, obj)
    }
  }
}

function strForEach (str, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var i = -1
  var len = str.length

  while (++i < len) {
    fn(str.charAt(i), i, str)
  }
}

module.exports = make(arrForEach, objForEach, strForEach)
