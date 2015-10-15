var make = require('./make_')
var makeIterator = require('../function/makeIterator_')

function arrFilter (arr, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var result = []
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

function filter (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var result = {}
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (fn(obj[key], key, obj)) result[key] = obj[key]
    }
  }
  return result
}

module.exports = make(arrFilter, objFilter)
