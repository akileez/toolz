var is = require('./is')

function isnt (a, b) {
  return !is(a, b)
}

module.exports = isnt
