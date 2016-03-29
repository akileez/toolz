function keys (obj) {
  var hasOwn = Object.prototype.hasOwnProperty
  var result = []
  var key

  for (key in obj) {
    if (hasOwn.call(obj, key)) {
      result.push(key)
    }
  }
  return result
}

module.exports = keys
