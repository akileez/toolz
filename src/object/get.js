// get nested object property

function getValue (obj, prop) {
  var parts = prop.split('.')
  var last = parts.pop()

  while ((prop = parts.shift())) {
    obj = obj[prop]
    if (obj == null) return
  }
  return obj[last]
}

module.exports = getValue
