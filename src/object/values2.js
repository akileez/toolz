function values (obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key]
  })
}

module.exports = values
