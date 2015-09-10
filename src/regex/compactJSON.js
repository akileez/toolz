// remove empty lines (new line character)in a file
// when proceeded by one or more spaces

function removeEmptyLines (str) {
  return str.replace(/( ){1,}(\r\n|\n){1,}/g, '')
}

module.exports = removeEmptyLines
