function reject (obj, fn) {
  var result = {}
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (!fn(obj[key], key, obj)) result[key] = obj[key]
    }
  }
  return result
}

module.exports = reject
