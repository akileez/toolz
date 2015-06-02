var has = require('./has')

// unset object property

function unset (obj, prop) {
  if (has(obj, prop)) {
    var parts = prop.split('.')
    var last = parts.pop()
    while (prop = parts.shift()) {
      obj = obj[prop]
    }
    return (delete obj[last])
  } else {
    // if property doesn't exist treat as deleted
    return true
  }
}

module.exports = unset
