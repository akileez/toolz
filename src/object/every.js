function every (obj, fn) {
  var result = true
  var key

  for (key in obj) {
    // istanbul ignore else
    if (obj.hasOwnProperty(key)) {
      if (!fn(obj[key], key, obj)) {
        result = false
        break
      }
    }
  }
  return result
}

module.exports = every
