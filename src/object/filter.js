function filter (obj, fn) {
  var hasOwn = Object.prototype.hasOwnProperty
  var result = {}
  var key

  for (key in obj) {
    if (hasOwn.call(obj, key)) {
      if (fn(obj[key], key, obj)) result[key] = obj[key]
    }
  }
  return result
}

module.exports = filter
