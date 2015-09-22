// from: match-words <https://github.com/jonschlinkert/match-words>
// Copyright (c) 2015, Jon Schlinkert. (MIT)

// returns an array of words from a given string
// regex/words is the pattern to match

var words = require('../regex/words')

function wordmatch (str) {
  return str.match(words())
}

module.exports = wordmatch
