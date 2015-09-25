// regular expression for lines (new line character) in a file
// when proceeded by one or more spaces

function emptylines () {
  return /( ){1,}(\r\n|\n){1,}/g
}

module.exports = emptylines
