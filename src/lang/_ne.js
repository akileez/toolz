var eq = require('./_eq')

function ne (a, b) {
  return !eq(a, b)
}

module.exports = ne
