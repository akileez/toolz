var uncamelized = require('./case-uncamelize')
var slugify     = require('./case-slugify')
var stringify   = require('./stringify')

// convert a 'string' to dot case

function toDotCase (str) {
  return slugify(uncamelized(stringify(str)), '.')
}

module.exports = toDotCase
