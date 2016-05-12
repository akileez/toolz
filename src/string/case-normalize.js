var stringify   = require('./stringify')
var camelized   = require('./case-camelize')
var uncamelized = require('./case-uncamelize')

function normalized (str) {
  return uncamelized(camelized(stringify(str)))
    .replace(/\./g, ' ')
}

module.exports = normalized
