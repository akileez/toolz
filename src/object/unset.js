var has           = require('./has')
var isPlainObject = require('../lang/isPlainObject')
var assert        = require('assert')

// unset object property

function unset (obj, prop) {
  assert(isPlainObject(obj), 'expected an object')

  if (obj.hasOwnProperty(prop)) {
    delete obj[prop]
    return true
  }

  if (has(obj, prop)) {
    var segs = prop.split('.')
    var last = segs.pop()

    while (segs.length) {
      obj = obj[segs.shift()]
    }
    return (delete obj[last])
  } else {
    // if property doesn't exist treat as deleted
    return true
  }
}

module.exports = unset
