var fill = require('./fill')

function padLeft (str, width, ch) {
  str = String(str)
  ch = ch  || ' '

  return (str.length < width)
    ? fill(ch, width - str.length) + str
    : str
}

module.exports = padLeft
