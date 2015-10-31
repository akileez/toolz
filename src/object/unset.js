// unset object property

var has = require('./has')

function unset (obj, prop) {
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
