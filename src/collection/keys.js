function keys (obj) {
  var result = []
  var key
  var hasOwn = Object.prototype.hasOwnProperty

  for (key in obj) {
    if (hasOwn.call(obj, key)) {
      result.push(key)
    }
  }
  return result
}

module.exports = keys
