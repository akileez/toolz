var make = require('./_make')
var makeIterator = require('../function/makeIterator_')
var hasOwn = Object.prototype.hasOwnProperty

function arrFilter (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var result = []
  // istanbul ignore if
  // due to the way `_make` works at present, a null or undefined list
  // will return undefined. may change in future
  if (arr == null) return result

  var val
  var i = -1
  var j = -1
  var len = arr.length

  while (++i < len) {
    val = arr[i]
    if (fn(val, i, arr)) result[++j] = val
  }
  return result
}

function objFilter (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var result = {}
  var key

  for (key in obj) {
    // istanbul ignore else
    if (hasOwn.call(obj, key)) {
      if (fn(obj[key], key, obj)) result[key] = obj[key]
    }
  }
  return result
}

module.exports = make(arrFilter, objFilter)
