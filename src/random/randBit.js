var randBool = require('./randBool')

// returns random bit (0 or 1)

function randomBit () {
  return randBool() ? 1 : 0
}

module.exports = randomBit
