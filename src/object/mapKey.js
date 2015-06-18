var forOwn = require('./forOwn')
var makeIterator = require('../function/makeIterator_')

// creates a new object where all the keys are the
// result of calling callback

function mapKeys (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  var output = {}

  forOwn(obj, function(val, key, obj) {
    output[fn(val, key, obj)] = val
  })
  return output
}

module.exports = mapKeys