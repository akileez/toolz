var rb = require('crypto').randomBytes

function randBytes () {
  return rb(16)
}

module.exports = randBytes
