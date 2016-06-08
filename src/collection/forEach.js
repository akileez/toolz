var make = require('./_make')
var makeIterator = require('../function/makeIterator_')
var hasOwn = Object.prototype.hasOwnProperty

function arrForEach (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  // istanbul ignore if
  // due to the way `_make` works at present, a null or undefined list
  // will return undefined. may change in future
  if (arr == null) return

  var i = -1
  var len = arr.length

  while (++i < len) {
    // istanbul ignore if
    if (fn(arr[i], i, arr) === false) break
  }
}

function objForEach (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var key

  for (key in obj) {
    // istanbul ignore else
    if (hasOwn.call(obj, key)) {
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
