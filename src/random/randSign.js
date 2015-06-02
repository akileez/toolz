var randBool = require('./randBool')

// returns random sign ( -1 or 1 )

function randomSign () {
  return randBool() ? 1 : -1
}

module.exports = randomSign
