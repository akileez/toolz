function prop (name) {
  return function (obj) {
    return obj[name]
  }
}

module.exports = prop
