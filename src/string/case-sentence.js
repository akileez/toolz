var clean = require('./case-none')

/*
  Returns the string converted to sentence case, preserving punctuation.

    var toSentenceCase = require('to-sentence-case')

    toSentenceCase('the catcher, in the rye.')
    // "The catcher, in the rye."

*/

function toSentenceCase(string) {
  return clean(string).replace(/[a-z]/i, function (letter) {
    return letter.toUpperCase()
  }).trim()
}

module.exports = toSentenceCase
