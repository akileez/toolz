var chars = require('./chars')

function reverse (str) {
  return chars(str).reverse().join('')
}

module.exports = reverse
