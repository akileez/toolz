function mapKeys (obj, fn) {
  var result = {}
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[fn(obj[key], key, obj)] = obj[key]
    }
  }
}

module.exports = mapKeys
