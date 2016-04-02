var toString = require('../lang/toString')

function endsWith (str, suffix) {
  str = toString(str)
  suffix = toString(suffix)

  return str.indexOf(suffix, str.length - suffix.length) !== -1
}

module.exports = endsWith
