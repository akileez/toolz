function map (obj, fn) {
  var result = {}
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = fn(obj[key], key, obj)
    }
  }
  return result
}

module.exports = map
