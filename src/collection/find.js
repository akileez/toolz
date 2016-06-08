var make = require('./_make')
var makeIterator = require('../function/makeIterator_')
var findIndex = require('./findIndex')
var some = require('./some')

// Find value that returns true on iterator check.

function arrFind (arr, fn, thisObj) {
  var idx = findIndex(arr, fn, thisObj)

  // istanbul ignore next
  // due to the way `_make` works at present, a null or undefined list
  // will return undefined. may change in future
  // i.e. void (0) will never be reached
  return idx >= 0
    ? arr[idx]
    : void (0)
}

function objFind (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var result

  some(obj, function (val, key, obj) {
    if (fn(val, key, obj)) {
      result = val
      return true // break
    }
  })
  return result
}

module.exports = make(arrFind, objFind)
