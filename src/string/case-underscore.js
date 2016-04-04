var stringify  = require('./stringify')
var slugify    = require('./case-slugify')
var uncamelize = require('./case-uncamelize')

// Replaces spaces with underscores, split camelCase text, remove non-word chars,
// remove accents and convert to lower case.

function underscore (str) {
  return slugify(uncamelize(stringify(str)), '_')
}

module.exports = underscore
