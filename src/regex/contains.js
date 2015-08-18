// The test() method executes a search for a match between a regular expression and a specified string.
// Returns true or false.

function contains (re, str) {
  return re.test(str)
}

module.exports = contains
