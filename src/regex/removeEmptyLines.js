// remove empty lines (new line character)in a file
// when proceeded by one or more spaces

var emptylines = require('./rex-emptylines')
var replace = require('./replace')

function removeEmptyLines (str) {
  return replace(str, emptylines, '')
}

module.exports = removeEmptyLines
