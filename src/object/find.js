var some = require('./some')
var makeIterator = require('../function/makeIterator')

// returns first item that matches criteria

function find (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var result
  some(obj, function (value, key, obj) {
    if (fn(value, key, obj)) {
      result = value
      return true // break
    }
  })
  return result
}

module.exports = find
