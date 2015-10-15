var make = require('./make_')
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


module.exports = make(arrForEach, objForEach)
