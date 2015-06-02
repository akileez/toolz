var forOwn = require('./forOwn')
var makeIterator = require('../function/makeIterator')

// creates a new object where all the values are the
// result of calling callback

function mapValues (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var output = {}

  forOwn(obj, function(val, key, obj) {
    output[key] = fn(val, key, obj)
  })
  return output
}

module.exports = mapValues
