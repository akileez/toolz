function some (obj, fn) {
  var result = false
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (fn(obj[key], key, obj)) {
        result = true
        break
      }
    }
  }
  return result
}

module.exports = some

