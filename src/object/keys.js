function keys (obj) {
  var result = []
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push(key)
    }
  }
  return result
}

module.exports = keys
