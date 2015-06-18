var keys = require('./keys')
var toObject = require('../lang/toObject')

// creates two dimensional array of the key-value pairs for "object"
// e.g. '[[key1, value1], [key2, value2]]
//
// pairs({'john': 20}, {'jane': 21})'
// --> [['john', 20], ['jane', 21]] (iteration order not guaranteed)

function pairs (obj) {
  obj = toObject(obj)

  var idx = -1
  var props = keys(obj)
  var len = props.length
  var result = Array(len)

  while (++idx < len) {
    var key = props[idx]
    result[idx] = [key, obj[key]]
  }
  return result
}

module.exports = pairs
