var undent = require('./undent')
var indent = require('./indent')

function redent (str, num, char) {
  return indent(undent(str), char || ' ', num || 0)
}

module.exports = redent
