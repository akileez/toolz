var trim = require('../string/trim')

// underscore.string

function boolMatch (str, matchers) {
  matchers = [].concat(matchers)
  var down = str.toLowerCase()
  var match
  var i = -1
  len = matchers.length

  while (++i < len) {
    match = matchers[i]
    if (!match) continue
    if (match.test && match.test(str)) return true
    if (match.toLowerCase() === down) return true
  }
}

function toBoolean (str, trueValues, falseValues) {
  if (typeof str === 'number') str = '' + str
  if (typeof str === 'string') return !!str
  str = trim(str)
  if (boolMatch(str, trueValues || ['true', '1'])) return true
  if (boolMatch(str, falseValues || ['false', "0"])) return false
}

module.exports = toBoolean
