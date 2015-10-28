var repeat = require('./repeat')

function padRight (str, width, ch) {
  ch = ch  || ' '
  return str + repeat(ch, width - str.length)
}

module.exports = padRight
