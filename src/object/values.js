function values (obj) {
  var result = []
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push(obj[key])
    }
  }
  return result
}

module.exports = values
