var make = require('./_make')
var makeIterator = require('../function/makeIterator_')
var hasOwn = Object.prototype.hasOwnProperty

function arrMap (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)

  var results = []
  // istanbul ignore if
  // due to the way `_make` works at present, a null or undefined list
  // will return undefined. may change in future
  if (arr == null) return results

  var i = -1
  var len = arr.length

  while (++i < len) {
    results[i] = fn(arr[i], i, arr)
  }
  return results
}

function objMap (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var result = {}
  var key

  for (key in obj) {
    // istanbul ignore else
    if (hasOwn.call(obj, key)) {
      result[key] = fn(obj[key], key, obj)
    }
  }
  return result
}

module.exports = make(arrMap, objMap)
