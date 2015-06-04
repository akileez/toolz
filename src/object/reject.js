var filter = require('./filter')
var makeIterator = require('../function/makeIterator_')

// object reject

function reject (obj, fn, thisObj) {
  fn = makeIterator(fn, thisObj)
  return filter(obj, function (val, idx, obj) {
    return !fn(val, idx, obj)
  }, thisObj)
}

module.exports = reject
