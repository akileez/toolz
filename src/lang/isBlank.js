var toString = require('../lang/toString')

// underscore.string

function isBlank (str) {
  return (/^\s*$/).test(toString(str))
}

module.exports = isBlank
