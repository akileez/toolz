var isBlank = require('../lang/isBlank')
var trim = require('../string/trim')

// underscore.string

function words (str, delimiter) {
  if (isBlank(str)) return []
  return trim(str, delimiter).split(delimiter || /\s+/)
}

module.exports = words
