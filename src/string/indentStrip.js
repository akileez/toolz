var matches = require('../regex/matches')
var replace = require('../regex/replace')

function stripIndent (str) {
  var match = matches(/^[ \t]*(?=\S)/gm, str)

  if (!match) return str

  var indent = Math.min.apply(Math, match.map(function (element) {
    return element.length
  }))

  var re = new RegExp('^[ \\t]{' + indent + '}', 'gm')

  return indent > 0
    ? replace(re, '', str)
    : str
}

module.exports = stripIndent
