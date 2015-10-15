var make = require('./make_')
var makeIterator = require('../function/makeIterator_')

function arrMap (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)

  var results = []
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
    if (obj.hasOwnProperty(key)) {
      result[key] = fn(obj[key], key, obj)
    }
  }
  return result
}

module.exports = make(arrMap, objMap)
