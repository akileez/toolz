function forIn (obj, fn) {
  var key

  for (key in obj) {
    if (fn(obj[key], key, obj) === false) break
  }
}

module.exports = forIn
