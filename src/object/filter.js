var forOwn = require('./forOwn')
var makeIterator = require('../function/makeIterator')

// creates a new object with all the properties where the
// callback returns true.

function filterValues (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var output = {}
  forOwn(obj, function (value, key, obj) {
    if (fn(value, key, obj)) output[key] = value
  })
  return output
}

module.exports = filterValues