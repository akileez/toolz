function every (obj, fn) {
  var hasOwn = Object.prototype.hasOwnProperty
  var result = true
  var key

  for (key in obj) {
    // istanbul ignore else
    if (hasOwn.call(obj, key)) {
      if (!fn(obj[key], key, obj)) {
        result = false
        break
      }
    }
  }
  return result
}

module.exports = every
