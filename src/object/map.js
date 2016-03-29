function map (obj, fn) {
  var hasOwn = Object.prototype.hasOwnProperty
  var result = {}
  var key

  for (key in obj) {
    if (hasOwn.call(obj, key)) {
      result[key] = fn(obj[key], key, obj)
    }
  }
  return result
}

module.exports = map
