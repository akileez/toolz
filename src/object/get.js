var isPrimitive = require('../lang/isPrimitive')

function get (obj, prop) {
  var parts = prop.split('.')
  var last = parts.pop()

  while (prop = parts.shift()) {
    obj = obj[prop]
    if (obj == null) return
  }
  return obj[last]
}

module.exports = get
