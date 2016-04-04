function surround (str, wrapr) {
  return [wrapr, str, wrapr].join('')
}

module.exports = surround
