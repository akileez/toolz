var trim           = require('./trim')
var stringify      = require('./stringify')
var replaceAccents = require('./replace-accents')
var removeNonWord  = require('./remove-non-word')

/*
  Convert to lower case, remove accents, remove non-word chars and
  replace spaces with the specified delimeter. Does not split camelCase text.
  Original code:

    str = stringify(str)

    if (delimeter == null) delimeter = '-'

    str = replaceAccents(str)
    str = removeNonWord(str)

    // trim should process after removeNonWord
    // then replace spaces with delimeter

    str = trim(str)
      .replace(/ +/g, delimeter)
      .toLowerCase()

    return str
*/

function slugify (str, delimeter) {
  if (delimeter == null) delimeter = '-'

  return trim(removeNonWord(replaceAccents(stringify(str))))
    .replace(/ +/g, delimeter)
    .toLowerCase()
}

module.exports = slugify
