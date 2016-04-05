var humanize = require('./case-humanize')
var escrex   = require('./esc-regex')
var minors   = require('./case-minors')

var escaped = minors.map(escrex)
var minorMatcher = new RegExp('[^^]\\b(' + escaped.join('|') + ')\\b', 'ig')
var punctuationMatcher = /:\s*(\w)/g

function toTitleCase(string) {
  return humanize(string)
    .replace(/(^|\s)(\w)/g, function (matches, previous, letter) {
      return previous + letter.toUpperCase()
    })
    .replace(minorMatcher, function (minor) {
      return minor.toLowerCase()
    })
    .replace(punctuationMatcher, function (letter) {
      return letter.toUpperCase()
    })
}

module.exports = toTitleCase
