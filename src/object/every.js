var forOwn = require('./forOwn')
var makeIterator = require('../function/makeIterator')

function every (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var result = true
  forOwn(obj, function (value, key) {
    // we consider any falsy values as false on purpose so shorthand
    // syntax can be used to check property existence
    if (!fn(value, key, obj)) {
      result = false
      return false // break
    }
  })
  return result
}

module.exports = every