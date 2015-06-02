var forOwn = require('./forOwn')
var makeIterator = require('../function/makeIterator')

// object some

function some (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var result = false
  forOwn(obj, function (val, key) {
    if (fn(val, key, obj)) {
      result = true
      return false // break
    }
  })
  return result
}

module.exports = some
