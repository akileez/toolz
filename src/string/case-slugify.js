var trim           = require('./trim')
var stringify      = require('./stringify')
var replaceAccents = require('./replace-accents')
var removeNonWord  = require('./remove-non-word')

// Convert to lower case, remove accents, remove non-word chars and
// replace spaces with the specified delimeter.
// Does not split camelCase text.

function slugify (str, delimeter) {
  str = stringify(str)

  if (delimeter == null) delimeter = '-'

  str = replaceAccents(str)
  str = removeNonWord(str)
  str = trim(str) // should come after removeNonWord
    .replace(/ +/g, delimeter) // replace spaces with delimeter
    .toLowerCase()

  return str
}

module.exports = slugify
