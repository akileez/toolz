var fill = require('./fill')

function padRight (str, width, ch) {
  str = String(str)
  ch = ch  || ' '

  return (str.length < width)
    ? str + fill(ch, width - str.length)
    : str
}

module.exports = padRight
