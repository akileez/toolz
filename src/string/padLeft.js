var repeat = require('./repeat')

function padLeft (str, width, ch) {
  ch = ch  || ' '
  return repeat(ch, width - str.length) + str
}

module.exports = padLeft
