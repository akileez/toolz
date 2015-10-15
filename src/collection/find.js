var make = require('./make_')
var makeIterator = require('../function/makeIterator_')

// Find value that returns true on iterator check.

function arrFind (arr, fn, thisObj) {
  var idx = findIndex(arr, fn, thisObj)

  return idx >= 0
    ? arr[idx]
    : void (0)
}

function findIndex (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)

  if (arr == null) return -1

  var i = -1
  var len = arr.length

  while (++i < len) {
    if (fn(arr[i], i, arr)) return i
  }
  return -1
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

function some (obj, fn, thisObj) {
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

module.exports = make(arrFind, objFind)
