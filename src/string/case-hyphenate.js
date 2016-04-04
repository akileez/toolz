var stringify  = require('./stringify')
var slugify    = require('./case-slugify')
var uncamelize = require('./case-uncamelize')

// Replaces spaces with hyphens, split camelCase text,
// remove non-word chars, remove accents and convert to lower case.

function hyphenate (str) {
  return slugify(uncamelize(stringify(str)), '-')
}

module.exports = hyphenate
