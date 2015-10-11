// get nested object property

function getValue (obj, prop) {
  var segs = prop.split('.')
  var last = segs.pop()

  while (segs.length) {
    obj = obj[segs.shift()]
    if (obj == null) return
  }

  return obj[last]
}

module.exports = getValue
