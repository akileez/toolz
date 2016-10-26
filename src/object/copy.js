function objectCopy (source, prop, object) {
  object || (object = {})

  var idx = -1
  var len = prop.length

  while (++idx < len) {
    var key = prop[idx]
    object[key] = source(key)
  }
  return object
}

module.exports = objectCopy