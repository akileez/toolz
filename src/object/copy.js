function objectCopy (source, prop, object) {
  object || (object = {})

  var idx = -1
  var len = props.length

  while (++idx < len) {
    var key = props[idx]
    object[key] = source(key)
  }
  return object
}

module.exports = objectCopy